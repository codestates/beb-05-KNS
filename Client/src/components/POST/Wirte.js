import React, { Component } from 'react'
import pell from 'pell'
import { Button } from 'antd';
import 'pell/dist/pell.min.css'

// pass pell object to custom actions callback
const mapActions = (actions) => {
  if (actions) {
    return actions.map((e) => {
      if (typeof e === 'object' && e.result) {
        return { ...e, result: () => e.result(pell) }
      }
      return e
    })
  }
  return actions
}
class POSTWirte extends Component {
  componentDidMount() {
    const {
      onChange,
      actions,
      styleWithCSS,
      actionBarClass,
      buttonClass,
      contentClass,
      defaultContent,
    } = this.props

    // initialize pell editor
    pell.init({
      element: this.container,
      onChange: html => onChange(html),
      actions: mapActions(actions),
      styleWithCSS,
      classes: {
        actionbar: actionBarClass,
        button: buttonClass,
        content: contentClass,
      },
    })

    // set default content
    this.container.content.innerHTML = defaultContent
  }

  componentDidUpdate() {
    const { defaultContent } = this.props
    if (this.container.content.innerHTML !== defaultContent) {
      this.container.content.innerHTML = defaultContent
    }
  }

  // return the editor content
  getContent = () => this.container.content.innerHTML

  render() {
    return (
    <div><div ref={ e => (this.container = e)} 
            className={this.props.containerClass} 
            style={{
                width: 800,
            }}/>
            <Button type="wirte">글작성</Button>
    </div>
    )}
}

export default POSTWirte;       
