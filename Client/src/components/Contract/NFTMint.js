import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Layout,  Modal, Upload, Form,  Input,  Button,  Radio,  InputNumber,} from 'antd';
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

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
    };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const uploadButton = (
    <div>
        <PlusOutlined />
        <div
        style={{
            marginTop: 8
        }}
        >
        Upload
        </div>
    </div>
    );

    return (
        <Layout style={{
            padding: '100px 300px',
            minHeight: 240,
            background: '#fff'
            }}>
            <Form>
                <Form.Item label="Category">
                <Radio.Group>
                    <Radio value="1"> All </Radio>
                    <Radio value="2"> Card </Radio>
                    <Radio value="3"> Image </Radio>
                    <Radio value="4"> Credit </Radio>
                </Radio.Group>
                </Form.Item>
                
                <Form.Item label="NFT Name">
                <Input />
                </Form.Item>

                <Form.Item label="Desc">
                <TextArea rows={4} />
                </Form.Item>
                
                <Form.Item label="Price">
                <InputNumber />
                </Form.Item>

                <Form.Item label="FileUp">
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
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
                <Button>NFT 생성</Button>
        </Layout>
    );
};

export default UseMintNftimg;
