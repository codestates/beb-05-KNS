import React from 'react';
import { Card,Space } from 'antd';
import { NavLink } from "react-router-dom";
import POSTDelete from './Delete'

const { Meta } = Card;
const PLItem = ({ body, title, id, toggleFavoritePosts, favoritePost }) => {

    const onClickFavorite = (e) => {
        e.preventDefault();
        toggleFavoritePosts(id);
      }

    return (
        <Card
        hoverable
        style={{
            width: 240,
        }}
        cover={<img alt="example" src="https://picsum.photos/600/400" />}
        >
        <Meta title="Europe Street beat" description="testasetestaestsetsetestse" />            
                <div className="uk-card-body">

      <Space size={30}>
            {/* <NavLink to={{ pathname: "/Post/" + id, postTitle: title, postBody: body }}  > */}
            <NavLink to='/post'>상세정보</NavLink>            
            <POSTDelete />
            </Space>
            </div>
        </Card>
    )
};

export default PLItem;