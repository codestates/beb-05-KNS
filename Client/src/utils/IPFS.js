import axios from "axios";
//pinata API 정보
const pinata_gwUrl = 'https://gateway.pinata.cloud/ipfs/';
const pinata_baseUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const pinata_JsonUrl = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

const pinata_ApiKey = process.env.REACT_APP_PINATA_APIKEY;
const pinata_SecretApiKey = process.env.REACT_APP_PINATA_SECRET;

//일반 파일을 ipfs에 업로드하는 함수 (input 파일경로 ouput 파일에 접근가능한 ipfshash)
export async function pinataUpload(filePath){

  let data = new FormData();
  data.append('file', filePath);
  console.log(data);
  return axios.post(pinata_baseUrl, data, {
      headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: pinata_ApiKey,
          pinata_secret_api_key: pinata_SecretApiKey
      }
  })
  .then(function (response) {
      return pinata_gwUrl+response.data.IpfsHash;
  })
  .catch(function (error) {
    console.log(error);
    return null;
  });
}

//JSON 파일을 ipfs에 업로드하는 함수 (input JSON Object ouput 파일에 접근가능한 url)
export async function pinataUploadJSON(data){

  return axios.post(pinata_JsonUrl, {
    pinataMetadata: {
      name: 'metadata.json'
    },
    pinataContent: data
  }, {
    headers: {
      'Content-Type': 'application/json',
      pinata_api_key: pinata_ApiKey,
      pinata_secret_api_key: pinata_SecretApiKey
    }
  })
  .then(function (response) {
      return response.data.IpfsHash;
  })
  .catch(function (error) {
    console.log(error);
    return null;
  });
}
