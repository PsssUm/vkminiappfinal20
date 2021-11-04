import React from 'react';
import { Button, Separator, PanelHeader } from '@vkontakte/vkui';
import StickerItem from './StickerItem';
const urls = ["https://i.ibb.co/CJv3jC1/image.png", "https://i.ibb.co/m9VgSM5/04.png", "https://i.ibb.co/wJ77hkk/01.png", "https://i.ibb.co/0QTGnvv/02.png", "https://i.ibb.co/021kcQR/03.png", "https://i.ibb.co/HDJ4pGR/05.png"]
class Stories extends React.Component {
   
	constructor(){
        super()
        this.state = {
            stickers : []
        }
        
    }

    componentDidMount(){
        this.createStickers()
    }
    createStickers = () => {
        const stickers = []
        urls.forEach(url => {
            stickers.push(this.createSticker(url))
        });
        this.setState({stickers : stickers})
    }
    createSticker = (url) => {
        const sticker = {"sticker_type" : "renderable", 
            "sticker" : { "content_type" : "image", 
            "url" : url, 
            "clickable_zones" : [
                {"action_type" : "link", 
                    "action" :  { 
                    "link": "https://vk.com/app7601800", 
                    "tooltip_text_key": "tooltip_open_default" }
                }
            ]}
        }
        return sticker
    }
    

	render() {
	  return (
		<div className="">
            <PanelHeader separator={false}>Истории</PanelHeader>	
            {/* <div className="qr_button">
                <Button onClick={this.openStories} size="l" stretched style={{ marginTop: 16, marginBottom : 28 }}>Создать сторис</Button>
            </div> */}
            <p className="stories_title">Выберите стикер, который хотите добавить в вашу историю</p>
            <div className="stickers_container">
                {this.state.stickers.reverse().map((item, index) => (
                    <StickerItem  index={index} sticker={item} key={index} />
                ))}
            </div>
        </div>
	  )
	}
  }
export default Stories;