import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import { Button } from '@vkontakte/vkui';

class Scanner extends React.Component {
   
	constructor(){
		super()
    }
    componentDidMount(){
        bridge.send("VKWebAppOpenCodeReader");
    }

	render() {
	  return (
		<div>

        </div>
	  )
	}
  }
  export default Scanner;