import React from 'react';
import ReactDOM from 'react-dom';
import { View, ScreenSpinner, Tabbar, TabbarItem, Epic ,AdaptivityProvider, AppRoot, withAdaptivity, usePlatform, ViewWidth, VKCOM, SplitLayout, SplitCol,Group, Panel, Cell, PanelHeader, Title } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './styles/styles.css'
import QRcods from './panels/QRcods';
import qr_code_active from './img/qr_code_active.svg'
import qr_code from './img/qr_code.svg'
import history_active from './img/history_active.svg'
import history from './img/history.svg'
class App extends React.Component {
   
	constructor(){
		super()
	}

	render() {
	  return (
		<AdaptivityProvider>
			<AppRoot>
				<MainView/>
				
			</AppRoot>
		</AdaptivityProvider>
	  )
	}
  }
  export default App;
  
  const MainView = withAdaptivity(({ viewWidth }) => {
	const platform = usePlatform();
	const [activeStory, setActiveStory] = React.useState('histories');
	const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);
	const isDesktop = viewWidth >= ViewWidth.TABLET;
	const hasHeader = platform !== VKCOM;
  
	return (
	  <SplitLayout
		header={hasHeader && <PanelHeader separator={false} />}
		style={{ justifyContent: "center" }}
	  >
		
  
		<SplitCol
		  animate={!isDesktop}
		  spaced={isDesktop}
		  width={isDesktop ? '560px' : '100%'}
		  maxWidth={isDesktop ? '560px' : '100%'}
		>
		<Epic activeStory={activeStory} tabbar={!isDesktop &&
			<Tabbar>
			<TabbarItem
				onClick={onStoryChange}
				selected={activeStory === 'histories'}
				data-story="histories"
				text="Истории"
			  > <img src={activeStory === 'histories' ? history_active : history}/>
			  </TabbarItem>
			  <TabbarItem
				onClick={onStoryChange}
				selected={activeStory === 'scanner'}
				data-story="scanner"
				text="QR-коды"
			  ><img src={activeStory === 'scanner' ? qr_code_active : qr_code}/>
			</TabbarItem>
			  
			 
			</Tabbar>
		  }>
			<View id="histories" activePanel="histories">
			  <Panel id="histories">
				<PanelHeader>Истории</PanelHeader>
				<Group style={{ height: '1000px' }}>
				  
				</Group>
			  </Panel>
			</View>
			<View id="scanner" activePanel="scanner">
			  <Panel id="scanner">
				<QRcods/>
			  </Panel>
			</View>
			
		  </Epic>
		</SplitCol>
	  </SplitLayout>
	);
  }, {
	viewWidth: true
  });
  
  <MainView />
  ReactDOM.render(
	<App/>
  ,
  document.getElementById('root')
  );