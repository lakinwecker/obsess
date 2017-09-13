import /*store,*/ { Project } from './store'
import { Component, h, Message, ConnectParams, RenderParams } from 'kaiju'
import { update } from 'immupdate'
import './project_style.scss'
// const styles = require("css-loader!sass-loader!./project_style.scss");
//const styles = require("./project_style.css");


export default function() {
  return Component<{}, ProjectList>({ name: 'projects', initState, connect, render })
}

enum Filter {
  Active,
  Complete
}

interface ProjectList {
  filter: Filter,
  projects: Project[],
  newProjectTitle: string
}

function initState() {
  return { filter: Filter.Complete, projects: [], newProjectTitle: '' }
}


const selectActive = Message('selectActive')
const selectComplete = Message('selectComplete')
const selectProject = Message('selectProject')
const newProjectTitleChange = Message<KeyboardEvent>('newProjectTitleChange')


function connect({ on }: ConnectParams<{}, ProjectList>) {
  on(selectActive, state => update(state, { filter: Filter.Active }))
  on(selectComplete, state => update(state, { filter: Filter.Complete }))
  on(newProjectTitleChange, (state, e) => {
    return update(state, { newProjectTitle: (<HTMLTextAreaElement>e.target).value })
  })
}

// TODO: state for active project
function render({ state }: RenderParams<{}, ProjectList>) {
  return h('nav.panel', [
		h('p.panel-heading', {}, 'Projects'),
		h('p.panel-tabs', [
			h('a' + (state.filter === Filter.Active ? '.is-active' : ''), { events: { click: selectActive } }, 'Active'),
			h('a' + (state.filter === Filter.Complete ? '.is-active' : ''), { events: { click: selectComplete } }, 'Complete'),
		])].concat(state.projects.map(project => 
			h('a.panel-block', { click: selectProject }, [
				h('span.panel-icon', [
					h('i.fa.fa-b-book')
				]),
				project.name
			])
		)).concat([
      h('div.panel-block', [
        h('p.control has-icons-left', [
          h('input.input.is-small',
            {
              attrs: { type: 'text', placeholder: 'Add Project' },
              events: { keypress: newProjectTitleChange }
            }, [
              h('span.icon is-small is-left', [
                h('i.fa fa-search')
              ])
            ]
          )
        ])
      ]),
      h('div.panel-block', [
        h('button.button.is-primary.is-outlined.is-fullwidth',
          ["Add Project"]
        )
      ])
    ])
	)
}
