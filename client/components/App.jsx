import React, {useEffect, useState} from 'react';
import AddModal from './AddModal.jsx';
import axios from 'axios';
function App ({loggedIn, setUsername, setPassword, setLoginMessage, userID}) {
  const [data, setData] = useState(undefined);
  const [fullScreenTrue, setFullscreen] = useState(false);
  const [Update, setUpdatedState] = useState({});
  const [Type, setViewType] = useState('Home');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios.get(`/Sites/${userID}`)
    .then(({data}) => setData(data))
  }, [fullScreenTrue, Update]);

  const ItemStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    placeContent: 'center space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }

  const ModalStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
  const ImgStyle = {
    maxWidth: '300px',
    maxHeight: '160px'

  }
  return (
    <>
    <div className="navBar">
    <ul className="navigation" style={
      {
        listStyleType: 'none',
        padding: '13px',
        overflow: 'hidden',
        backgroundColor: 'rgb(51, 51, 51)',
        display: 'flex',
        margin: '0px',
        flexDirection: 'row',
        color: 'white',
        width: 'auto',
        alignItems: 'center',
        justifyContent: 'space-around'
      }
    }>
      <li>
        <input type="checkbox" id="fullScreen" name="fullScreen" value="FullScreen" onChange={(e) => setFullscreen(e.target.checked)}/> <label htmlFor="fullScreen">{'Fullscreen (Youtube Bug)'}</label>
      </li>
      <li onClick={() => setViewType('Home')}>Home</li>
      <li onClick={() => setViewType('Gaming')}>Gaming</li>
      <li onClick={() => setViewType('Streaming')}>Streaming</li>
      <li onClick={() => setViewType('Browsing')}>Browsing</li>
      <li onClick={() => (localStorage.clear(), setUsername(''), setPassword(''), setLoginMessage('Please enter your username and password.'), loggedIn(false))}style={{fontSize: '10px'}}>Logout</li>
    </ul>
    </div>
    <div className={!modalVisible ? 'Container' : 'Container blur'}>
      <div className="Items" style={ItemStyle}>
      <a id="AddItem" className="Add Item">
        {/* <figure> */}
          <img onClick={() => setModalVisible(true)}src="https://media.istockphoto.com/vectors/black-plus-sign-positive-symbol-vector-id688550958?k=20&amp;m=688550958&amp;s=612x612&amp;w=0&amp;h=wvzUqT3u3feYygOXg3GB9pYBbqIsyu_xpvfTX-6HOd0="/>
        {/* </figure> */}
      </a>

      {data && data.map(data => {
        let goodToGo = false;
        if(Type === 'Streaming'){
          if(data.category === 'Streaming') {
            goodToGo = true;
          } else {
            goodToGo = false;
          }
        } else if (Type === 'Gaming') {
          if(data.category === 'Gaming'){
            goodToGo = true;
          } else {
            goodToGo = false;
          }
        }
        else if(Type === 'Browsing'){
          if(data.category === 'Browsing') {
            goodToGo = true;
          } else {
            goodToGo = false;
          }
        }
        else if (Type === 'Home') {
          goodToGo = true;
        }
      if(goodToGo){
        return <a key={data.name} href={fullScreenTrue ? "https://www.youtube.com/redirect?q=" + data.url : data.url} id={data.name}>
      {/* <figure> */}
        <img width="100%" style={ImgStyle} src={data.imageurl}></img>
      {/* </figure> */}
    </a>
      }
      })}
	  {/* <a href="https://hbomax.com/">
	    <figure>
	      <img style={ImgStyle} src="https://www.abettertheater.com/hbomax.gif"/>
	    </figure>
	  </a>
	  <a href="http://youtube.com">
    <figure>
	      <img style={ImgStyle} src="https://www.abettertheater.com/youtube.jpg"/>
	    </figure>
	  </a>
	  <a href="http://www.hulu.com/">
    <figure>
	      <img style={ImgStyle} src="https://www.abettertheater.com/hulu.jpg"/>
	    </figure>
	  </a>
	  <a href="https://netflix.com/">
    <figure>
	      <img style={ImgStyle} src="https://www.abettertheater.com/netflix.jpg"/>
	    </figure>
	  </a>
	  <a href="http://www.twitch.com">
    <figure>
	      <img style={ImgStyle} src="https://www.abettertheater.com/twitch.gif"/>
	    </figure>
	  </a>
	  <a href="http://www.disneyplus.com">
    <figure>
	      <img style={ImgStyle} src="https://www.abettertheater.com/disney.jpg"/>
	    </figure>
	  </a>

    <a href="https://stadia.google.com/u/1/library">
      <figure>
        <img style={ImgStyle} src="https://help.bungie.net/hc/article_attachments/360069178592/Stadia.jpg"></img>
      </figure>
    </a>

    <a href="https://play.rainway.com/">
      <figure>
        <img style={ImgStyle} src="https://i.imgur.com/IoXJ9Ct.png"></img>
      </figure>
    </a>

    <a href="https://www.xbox.com/en-US/play/">
      <figure>
        <img style={ImgStyle} src="https://i.imgur.com/3o9PhVb.png"></img>
      </figure>
    </a>



    <a href="https://google.com">
      <figure>
        <img style={ImgStyle} src="https://i.imgur.com/kawIwuv.png"></img>
      </figure>
    </a>

    <a href="https://raptus.site">
      <figure>
        <img style={ImgStyle} src="https://i.imgur.com/sqTuUKh.png"></img>
      </figure>
    </a> */}






      </div>
    </div>
    {modalVisible && <AddModal func={setModalVisible} update={setUpdatedState} user={userID} ></AddModal>}
  </>
  )
}
export default App