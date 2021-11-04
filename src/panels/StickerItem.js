import React from 'react';
import bridge from '@vkontakte/vk-bridge';

class StickerItem extends React.Component {
   
	constructor(props){
		super(props)
	}
    openStories = () => {
        bridge.send("VKWebAppShowStoryBox", { "background_type" : "none", 
         "stickers" : [this.props.sticker]}); 
    }
	render() {
	  return (
		<img onClick={this.openStories} className="sticker_item" src={this.props.sticker.sticker.url}/>
	  )
	}
  }
export default StickerItem;