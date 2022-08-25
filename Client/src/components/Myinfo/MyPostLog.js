import { Table,Button,Modal } from 'antd';
import React, {useEffect, useState} from 'react';
import { getMyPostList, deletePost } from '../../APIs/post';
import { useMyPostList } from '../../utils/Hooks'

const columns = [
  {
    title: 'PostNum',
    dataIndex: 'PostNum',
    key: 'PostNum',
  },
  {
    title: 'Title',
    dataIndex: 'Title',
    key: 'Title',
  },
  {
    title: 'Desc',
    dataIndex: 'Desc',
    key: 'Desc',
  },
  {
    title: 'Date',
    dataIndex: 'Date',
    key: 'Date',
  },
];

const MyPostLog = () => {
  //const [myPostList, setMyPostList] = useMyPostList((state) => [state.myPostList, state.setMyPostList]); //Hooks 불러오기
  const [myPostList,setMyPostList] = useState([]);
  const [saveList,setsaveList] = useState([]);
  const [,updateState] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [visible, setVisible] = useState(false);

  const getmyPost = async () =>{
      const { data: {data : list} } = await getMyPostList(1); //API 호출  
      setOuput(list); 
      setsaveList(list); //가공해서 써야해서 불필요한 모든 정보를 담는 배열은 여기에 저장
  }

  useEffect(() => {
    getmyPost();
  }, []);

  useEffect(() => {    
    updateState();
  }, [myPostList]);

  const setOuput = (arr) => {
      const ouput = arr.map( (ele,idx) =>{
      let obj = {key: '',PostNum: '',Date: '',Title: '',Desc: ''}
      obj.key = idx+1;
      obj.PostNum = ele.id;
      obj.Date = ele.createdAt;
      obj.Title = ele.title;
      obj.Desc = ele.content;
      return obj;  
    } )
    setMyPostList([...ouput]);      
  }
  
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }

            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }

            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const confirm = () => {   
    const delPostIdx = selectedRowKeys.map(element => {
      if(element <= 0) return -1; //값이 1부터 시작한다.
      const idx = element -1;      
      return myPostList[idx].PostNum;
    })

    delPostIdx.forEach( el =>{
      const res = deletePost(el);
      console.log(res);
    })
    console.log('00',delPostIdx);

    const newlist = myPostList.filter( (elem) => {
      if(delPostIdx.find( (element)=> (element === elem.PostNum)) === undefined)
        return true;
      else{    //여기서 상태 세팅
        console.log('find',elem.PostNum);
        return false;
      }
    });    
    setMyPostList([...newlist]);       
   // console.log('2222',myPostList); //음?
    setVisible(false);
  }
  const delbtn = ()=>{ setVisible(true) }

  return (
    <div >      
      <Table rowSelection={rowSelection} columns={columns} dataSource={myPostList}/>
      {
        selectedRowKeys.length > 0?
        <Button type="primary" onClick={delbtn}>선택파일삭제</Button>
        :<Button type="primary" disabled>
          선택파일삭제
        </Button> 
      }
      <Modal title="선택된 파일을 삭제 하시겠습니까？" centered visible={visible} width={500}        
      onOk={confirm} onCancel={() => setVisible(false)}>
      </Modal>
    </div>
  )
};

export default MyPostLog;