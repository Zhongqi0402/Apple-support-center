import React from 'react'
import { MessageBox } from "react-chat-elements";

const LiveChat = () => {
  return (
    <div>LiveChat
      <MessageBox
    position={"left"}
    type={"photo"}
    text={"react.svg"}
    data={{
        uri: "https://facebook.github.io/react/img/logo.svg",
        status: {
            click: false,
            loading: 0,
        },
    }}
        />

    </div>
  )
}

export default LiveChat