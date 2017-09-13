import {Router, State} from 'abyssa'
import { startApp } from 'kaiju'
import home from './home'
import klass from 'snabbdom/modules/class'
import props from 'snabbdom/modules/props'
import attrs from 'snabbdom/modules/attributes'
import style from 'snabbdom/modules/style'


function foo() {
}
var show = { enter: foo }
//var edit = { enter: articleEditEnter }

Router({
    article: State('/', show)
    //articleEdit: State('articles/:id/edit', edit)
}).init();

const snabbdomModules = [klass, props, attrs, style]

startApp({
  app: home(),
  snabbdomModules,
  elm: document.getElementById("app") as HTMLElement,
  replaceElm: true
})

