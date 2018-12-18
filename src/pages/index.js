import React, { Component } from "react"
import styled from "styled-components"
import _ from "lodash"
import quotes from "../data/quotes"

const LayoutCnt = styled.div`
  display: flex;
  justify-content: flex-end;
  .content {
    padding: 5vw 5vw 5vw 0;
    width: 50%;
    background: red;
    min-height: 100vh;
  }
  .flexit {
    display: flex;
  }
`

export default class IndexPage extends Component {
  state = { sentenceCount: 5, paragraphCount: 1, generatedLorem: [] }

  handleSentDecrement = e => {
    if (this.state.sentenceCount > 1) {
      this.setState({
        sentenceCount: this.state.sentenceCount - 1,
      })
    }
  }

  handleSentIncrement = e => {
    this.setState({
      sentenceCount: this.state.sentenceCount + 1,
    })
  }

  handleParaDecrement = e => {
    if (this.state.paragraphCount > 1) {
      this.setState({
        paragraphCount: this.state.paragraphCount - 1,
      })
    }
  }

  handleParaIncrement = e => {
    this.setState({
      paragraphCount: this.state.paragraphCount + 1,
    })
  }

  generateLorem = (sent, paragraph) => {
    let output = _.times(parseInt(paragraph), () =>
      quotes.sort(() => 0.5 - Math.random()).slice(0, sent)
    )
    this.setState({
      generatedLorem: output,
    })
  }

  componentDidMount = () => {
    this.generateLorem(this.state.sentenceCount, this.state.paragraphCount)
  }

  render() {
    return (
      <div>
        <LayoutCnt>
          <div className="content">
            <div className="flexit">
              <button onClick={() => this.handleSentDecrement()}>Dec</button>
              <div className="count">{this.state.sentenceCount}</div>
              <button onClick={() => this.handleSentIncrement()}>Inc</button>
            </div>
            <div className="flexit">
              <button onClick={() => this.handleParaDecrement()}>Dec</button>
              <div className="count">{this.state.paragraphCount}</div>
              <button onClick={() => this.handleParaIncrement()}>Inc</button>
            </div>
            <button
              onClick={() =>
                this.generateLorem(
                  this.state.sentenceCount,
                  this.state.paragraphCount
                )
              }
            >
              Generate Lorem
            </button>
            <div className="generated-lorem">
              {this.state.generatedLorem.map(para => (
                <p>{para.map(p => `${p} `)}</p>
              ))}
            </div>
          </div>
        </LayoutCnt>
      </div>
    )
  }
}
