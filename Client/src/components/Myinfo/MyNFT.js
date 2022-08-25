import React, {useEffect,useState} from 'react';
import NFTSlot from '../Contract/NFTSlot';
import { Col, Row, Divider } from 'antd';
import { useMyNftList } from '../../utils/Hooks'
import { getMyNftList } from '../../APIs/contract';

const MyNFT = () => {
    //const [myNftList, setMyNftList] = useMyNftList((state) => [state.myNftList, state.setMyNftList]); //Hooks 불러오기
    const [myNftList,setMyNftList] = useState([]);
    const getNftList = async () =>{
        const { data: {data} } = await getMyNftList(1); //API 호출
        setMyNftList([...data]);
        console.log("getMyNftList",data,myNftList );
    }

    useEffect(() => {
        getNftList();
    }, []);

    return (        
    <div>
        구입한 NFT 목록<br />
        <Divider orientation="left">Responsive</Divider>
        <Row gutter={{xs: 8,sm: 16,md: 24,lg: 32,}}>
        {myNftList.map( (Element,idx)=>{             
            return (<Col className="gutter-row" span={7}>
                <div style={{background: '#ffffff',padding: '2px 0'}}><NFTSlot NftList={Element}/></div>
            </Col>)
        })}
        </Row>
        
    </div>
    )
};

export default MyNFT;