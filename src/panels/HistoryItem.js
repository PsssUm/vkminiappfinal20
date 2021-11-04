import React from 'react';
import link_icon from '../img/link_icon.svg'
import text_icon from '../img/text_icon.svg'
class HistoryItem extends React.Component {
   
	constructor(props){
		super(props)
	}
    linkify = (inputText) => {
        var replacedText, replacePattern1, replacePattern2, replacePattern3;
    
        //URLs starting with http://, https://, or ftp://
        replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
    
        //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
        replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
    
        //Change email addresses to mailto:: links.
        replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
        replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
    
        return replacedText;
    }
	render() {
        const link = this.linkify(this.props.history_item.value)
        const isUrl = link.includes("</a>")
        return (
            <div className="history_item">
                <img src={isUrl ? link_icon : text_icon}/>
                <div>
                    <p className="history_item_title">{isUrl ? "Ссылка" : "Текст"}</p>
                    {isUrl ? <p className="history_max_w" dangerouslySetInnerHTML={{__html: link}}/> : <p className="history_item_text history_max_w">{this.props.history_item.value}</p>}
                </div>
            </div>
        )
	}
  }
  export default HistoryItem;