import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Document from '@/components/Document.vue'
import Vector from '@/views/Vector.vue'
import Find from '@/views/Find.vue'
import Boolean from '@/views/Boolean.vue'
import $backend from '@/backend'

Vue.use(Vuetify)

vi.mock('@/backend', () => ({
  default: {
    $vector: vi.fn(),
    $find: vi.fn(),
    $boolean: vi.fn(),
    $fetchDocuments: vi.fn()
  },
  API_URL: '/polls/'
}))

// a promise the test resolves by hand, to deliver answers out of order
function deferred () {
  let resolve, reject
  const promise = new Promise((res, rej) => { resolve = res; reject = rej })
  return { promise, resolve, reject }
}

const flush = () => new Promise(resolve => setTimeout(resolve))

function rows (wrapper) {
  return wrapper.findAll('tbody tr').wrappers.map(tr => tr.findAll('td').at(0).text())
}

beforeEach(() => {
  document.body.setAttribute('data-app', 'true')
  vi.clearAllMocks()
})

describe('Document', () => {
  it('shows the file id and the sample', () => {
    const wrapper = mount(Document, { propsData: { doc: { fileid: 'D1.txt', sample: 'La recherche' } } })
    expect(wrapper.text()).toContain('D1.txt')
    expect(wrapper.text()).toContain('La recherche')
  })
})

describe('Vector', () => {
  it('lists the best cosine match first', async () => {
    $backend.$vector.mockResolvedValue([
      { fileid: 'D1.txt', cosinus_measure: 0.42 },
      { fileid: 'D2.txt', cosinus_measure: 0.1 },
      { fileid: 'D4.txt', cosinus_measure: 0.43 }
    ])
    const wrapper = mount(Vector)
    await flush()
    expect(rows(wrapper)).toEqual(['D4.txt', 'D1.txt', 'D2.txt'])
  })

  it('ignores an answer that arrives after a newer one', async () => {
    const first = deferred()
    const second = deferred()
    $backend.$vector
      .mockReturnValueOnce(first.promise) // sent on mount
      .mockReturnValueOnce(second.promise) // sent after typing
    const wrapper = mount(Vector)
    wrapper.vm.query = 'besoin information'
    wrapper.vm.updateResults()

    second.resolve([{ fileid: 'D4.txt', cosinus_measure: 0.43 }])
    await flush()
    first.resolve([{ fileid: 'D9.txt', cosinus_measure: 1 }])
    await flush()

    expect(rows(wrapper)).toEqual(['D4.txt'])
  })
})

describe('Find', () => {
  it('lists the highest tf-idf first', async () => {
    $backend.$find.mockResolvedValue([
      { fileid: 'D2.txt', freq: 1, tf_idf: 0.23 },
      { fileid: 'D1.txt', freq: 3, tf_idf: 0.69 }
    ])
    const wrapper = mount(Find)
    await flush()
    expect(rows(wrapper)).toEqual(['D1.txt', 'D2.txt'])
  })

  it('opens one preview for the clicked row', async () => {
    $backend.$find.mockResolvedValue([
      { fileid: 'D1.txt', freq: 3, tf_idf: 0.69 },
      { fileid: 'D2.txt', freq: 1, tf_idf: 0.23 }
    ])
    $backend.$fetchDocuments.mockResolvedValue([
      { fileid: 'D1.txt', sample: 'first' },
      { fileid: 'D2.txt', sample: 'second' }
    ])
    const wrapper = mount(Find, { attachTo: document.body })
    await flush()
    await wrapper.findAll('tbody tr').at(1).find('button').trigger('click')
    await flush()
    expect(wrapper.vm.dialog).toBe(true)
    expect(wrapper.vm.previewing.sample).toBe('second')
    expect(wrapper.findAllComponents({ name: 'v-dialog' }).length).toBe(1)
    wrapper.destroy()
  })
})

describe('Boolean', () => {
  it('shows a syntax error for a rejected query', async () => {
    $backend.$boolean.mockRejectedValue(new Error('400'))
    const wrapper = mount(Boolean)
    await flush()
    expect(wrapper.text()).toContain('Syntax Error')
  })
})
