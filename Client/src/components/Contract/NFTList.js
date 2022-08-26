import React, {useEffect,useState} from 'react';
import NFTSlot from './NFTSlot';
import { Col, Row, Divider } from 'antd';
import { useNftList } from '../../utils/Hooks'
import { getNFTList } from '../../APIs/contract';

const NFTList = () => {
    //const [nftList, setNftList] = useNftList((state) => [state.nftList, state.setNftList]); //Hooks 불러오기
    const [nftList,setNftList] = useState([]);
    let bstate = false;
    const getNList = async () =>{
        const { data: {data} } = await getNFTList(); //API 호출
        setNftList([...data]);
        console.log("getALLNftList",data,nftList );
        bstate = true;
    }

    useEffect(() => {
        getNList();
    }, [bstate]);

    return (
    <div>        
        <Divider orientation="left">NFT SHOP</Divider>
        <Row gutter={{xs: 8,sm: 16,md: 24,lg: 32,}}>
        {nftList.map( (Element,idx)=>{             
            return (<Col className="gutter-row" span={7}>
                <div style={{background: '#ffffff',padding: '2px 0'}}>
                    <NFTSlot isBuy={true} NftList={Element}/>
                </div>
            </Col>)
        })}
        </Row>        
    </div>
    )
};

export default NFTList;