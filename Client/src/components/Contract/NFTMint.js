import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { pinataUpload, pinataUploadJSON } from '../../utils/IPFS'
import { mintNFT } from '../../APIs/contract';
import { Layout,  Modal, Upload, Form,  Input,  Button,  Radio,  message} from 'antd';
import { myInfo } from '../../APIs/auth';
const { TextArea } = Input;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
});

const UseMintNftimg = () => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]);
    const [nftData, setInput] = useState({
        NFTFile: "",
        NFTName: "",
        NFTDesc: "",
        SellPrice: 0,
        Category: 0,
        ExLink: "",
        MetaData:"",
    });
    const [bMintButton, SetMintButtonStatus] = useState(false);
    const [bFileCheck, SetFileCheck] = useState(false);
    const checkReadyToMint = () => {
        console.log(nftData.NFTName , nftData.NFTDesc , bFileCheck , nftData.SellPrice);
        SetMintButtonStatus(nftData.NFTName && nftData.NFTDesc && bFileCheck && nftData.SellPrice);
    }

    const handleCancel = () => {
        setPreviewVisible(false);
        SetFileCheck(false);
    }
    const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1))};

    const handleChange = ({ fileList: newFileList }) =>{
        setFileList(newFileList);
        setMintData('NFTFile', newFileList[0])
    }

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";    
        if (!isJpgOrPng) {
            message.error({
                content: 'JPG/PNG 포멧만 지원합니다.',
                className: 'custom-class',
                style: {
                marginTop: '40vh',
                },
            });
        }        
        const isLt2M = file.size / 1024 / 1024 < 2;        
        if (!isLt2M) {
            message.error({
                content: '2메가 미만의 크기만 지원합니다.',
                className: 'custom-class',
                style: {
                marginTop: '40vh',
                alignItems: 'center'
                },
            });
        }
        if(isJpgOrPng && isLt2M){
            SetFileCheck(isJpgOrPng && isLt2M);
            return isJpgOrPng && isLt2M;
        }
        return false;
    };

    useEffect(() => {
        checkReadyToMint();
    }, [nftData,fileList,bFileCheck,previewVisible]);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{marginTop: 8}}>
                Upload
            </div>
        </div>
    );

    const setMintData = (name, value) => {
        setInput({
            ...nftData,
            [name]: value,
        });  
    }

    const onChange = (e) => {
        setMintData(e.target.name, e.target.value);
    };

    const sendMint = async () => {
        if (!bFileCheck) {
            message.error({
                content: '파일 정보가 없습니다. 확인해 주세요.',
                className: 'custom-class',
                style: {
                marginTop: '40vh',
                alignItems: 'center'
                },
            });
            return;
        }

        const upLoadIPFSUrl = await pinataUpload(nftData.NFTFile.originFileObj);
        console.log('----file url----',upLoadIPFSUrl);
        setMintData("ExLink", upLoadIPFSUrl);
        const metaDataJson = {
            name: nftData.NFTName,
            description: nftData.NFTDesc,
            price: nftData.SellPrice,
            NFTUrl: upLoadIPFSUrl,
        };
        console.log(metaDataJson);
        const upLoadIPFSMetaDataUrl = await pinataUploadJSON(metaDataJson);
        console.log('----file url----',upLoadIPFSMetaDataUrl); // JSON 파일 경로
        setMintData("METADATA", upLoadIPFSMetaDataUrl);

        minting(upLoadIPFSUrl, upLoadIPFSMetaDataUrl); //서버 전송
    }
    
    const minting = async (upLoadIPFSUrl, upLoadIPFSMetaDataUrl) =>{
        const data = {
            tokenId : 0, 
            tokenName: nftData.NFTName, 
            desc: nftData.NFTDesc, 
            tx_hash: "", 
            tokenURI: upLoadIPFSMetaDataUrl, 
            img: upLoadIPFSUrl,
        }
        const { res } = await mintNFT(data); //API 호출
        console.log(res);
    }

    return (
        <Layout style={{
            padding: '100px 300px',
            minHeight: 240,
            background: '#fff'
            }}>
            <Form>
                <Form.Item label="Category">
                <Radio.Group Name='Category' defaultValue="1" >
                    <Radio Name='Category' onChange={onChange} value="1" > All </Radio>
                    <Radio Name='Category' onChange={onChange} value="2" > Card </Radio>
                    <Radio Name='Category' onChange={onChange} value="3" > Image </Radio>
                    <Radio Name='Category' onChange={onChange} value="4" > Credit </Radio>
                </Radio.Group>
                </Form.Item>
                
                <Form.Item label="NFT Name">
                <Input Name='NFTName' onChange={onChange}/>
                </Form.Item>

                <Form.Item label="Desc">
                <TextArea Name='NFTDesc' rows={4} onChange={onChange}/>
                </Form.Item>
                
                <Form.Item label="Price">
                <Input Name='SellPrice' onChange={onChange}/>
                </Form.Item>

                <Form.Item label="FileUp">
                    <Upload
                        action=""
                        listType="picture-card"
                        fileList={fileList}
                        beforeUpload={beforeUpload}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel} 
                    >
                        <img
                        alt="example"
                        style={{
                            width: "100%"
                        }}
                        src={previewImage}
                        />
                    </Modal>
                </Form.Item>

            </Form>
                {bMintButton?<Button onClick={sendMint} >NFT 생성</Button>:
                <Button danger >NFT 정보가 부족합니다</Button>}
        </Layout>
    );
};

export default UseMintNftimg;
