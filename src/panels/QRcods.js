import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import { Button, Separator, PanelHeader } from '@vkontakte/vkui';
import HistoryItem from './HistoryItem';
import empty_history from '../img/empty_history.svg'

class QRcods extends React.Component {
   
	constructor(){
        super()
        this.state = {
            qrResult : undefined,
            history : []
        }
    }
    componentDidMount(){
        bridge.subscribe(this.onBridgeResult);
        bridge.send("VKWebAppStorageGetKeys", {"count": 100, "offset": 0})
    }
    onBridgeResult = (e) => {
        // this.setState({bridgeResult : this.state.bridgeResult + " " + e.detail.type})
        // console.log("bridge e = " + JSON.stringify(e.detail.type))
        switch (e.detail.type) {
            case "VKWebAppOpenCodeReaderResult":
                const dataItem = { "key" : this.state.history.length + "", "value" : e.detail.data.code_data }
                var history = this.state.history
                history.push(dataItem)
                this.setState({history : history})
                bridge.send("VKWebAppStorageSet", dataItem)
            break;
            case "VKWebAppOpenCodeReaderFailed":
                
            break;
            case "VKWebAppStorageGetKeysResult":
                bridge.send("VKWebAppStorageGet", {"keys": e.detail.data.keys});
            break;
            case "VKWebAppStorageGetResult":
                const historyResult = e.detail.data.keys
                if (historyResult.length > 0){
                    this.setState({history : historyResult})
                }
            break;            
      
            default:
            break;
        }
    }
    openScanner = () => {
        bridge.send("VKWebAppOpenCodeReader")
        // .then(data => { 
        //         this.setState({flashDetails : ""})
        // }) 
        // .catch(error => { 
        //     this.setState({flashDetails : "Нет доступа к Камере"})
        // });
    }
    
	render() {
	  return (
		<div className="qrcodes_container">
            <PanelHeader separator={false}>QR-коды</PanelHeader>	
            <div className="qr_button">
                <Button onClick={this.openScanner} size="l" stretched style={{ marginTop: 16, marginBottom : 28 }}>Сканировать QR-код</Button>
            </div>
            
            <Separator />
            {this.state.history.length > 0 ? <div>
                <p className="qr_count">Отсканировано: {this.state.history.length}</p>
                {this.state.history.reverse().map((item, index) => (
                    <HistoryItem  index={index} history_item={item} key={index} />
                ))}
            </div> :
             <div className="empty_qr_cods">
                    <img className="empty_qr_cods_icon center_horizontal" src={empty_history}/>
                    <p className="empty_qr_cods_text center_horizontal">Здесь будет отображаться история сканирования QR-кодов</p>
            </div>}

        </div>
	  )
	}
  }
  export default QRcods;