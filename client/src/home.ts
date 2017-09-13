import { Component, Message, ConnectParams, RenderParams } from 'kaiju'
import { update } from 'immupdate'
import project from './project'

export default function() {
    return Component<{}, State>({ name: 'button', initState, connect, render })
}

interface State {
    text: string
}

function initState() {
    return { text: '' }
}

const click = Message('click')

function connect({ on }: ConnectParams<{}, State>) {
    on(click, state => (update(state, { text: 'clicked' })))
}

function render({ }: RenderParams<{}, State>) {
    return project()
}
