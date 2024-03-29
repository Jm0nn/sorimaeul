import styled from "styled-components";
import { Line } from "../../components/common/Line";
import { Button } from "../../components/common/Button";
import ColorLine from "../../components/inquiry/ColorLine";
import { useNavigate, useParams } from "react-router-dom";
import { getRequestDetail } from "../../utils/inquiryAPI";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";

const ContentBox = styled.div<{ $isMine?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: .75rem;
  width: 75%;
  margin: 0 auto;

  .title {
    width: 100%;
    font-size: 2rem;
  }

  .date {
    width: 100%;
    font-size: 0.75rem;
    font-family: 'GmarketSansLight';
    text-align: right;
  }

  .content {
    width: 100%;
    font-size: 1rem;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  .button-box{
    margin-left: auto;
    display: flex;
    gap: .5rem;
    .mine {
      display: ${(props) => props.$isMine ? 'block' : 'none'};
    }
  }
`

export interface InfoData {
  title: string;
  content: string;
  createdTime: string;
  nickname: string;
}

function RequestDetailPage() {
  const navigate = useNavigate();
  const params =  useParams();
  const userName = useSelector((state: RootState) => state.user.nickname);
  const [data, setData] = useState<InfoData>();

  const getDetail = async () => {
    if (params.id) {
      const res = await getRequestDetail(params.id);
      setData(res);
    }
  };

  useEffect(() => {
    getDetail();
  }, [])

  return (
    <>
      <ColorLine />
      <ContentBox $isMine={data?.nickname === userName}>
        <h2 className="title">{data?.title}</h2>
        <Line />
        <div className="mb-4 flex flex-col gap-4">
          <p className="date">{data?.createdTime}</p>
          <div className="content">{data?.content}</div>
        </div>
        <Line />
        <div className="button-box">
          <Button onClick={() => navigate('/request')} $marginLeft={0} $marginTop={0} $width={4.375} $height={2}>목록보기</Button>
          <Button className="mine" onClick={() => navigate(`/request/${params.id}/edit`)} $marginLeft={0} $marginTop={0} $width={4.375} $height={2} $background="#28BEFF">수정</Button>
          <Button className="mine" $marginLeft={0} $marginTop={0} $width={4.375} $height={2}>삭제</Button>
        </div>
      </ContentBox>
    </>
  )
}

export default RequestDetailPage;