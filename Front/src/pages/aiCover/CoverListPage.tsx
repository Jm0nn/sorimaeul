import { useEffect, useState } from "react";
import { CoverListInterface } from "../../components/aiCover/CoverInterface";
import { getCovers, getPopularCovers } from "../../utils/coverAPI";
import styled from "styled-components";
import CoverList from "../../components/aiCover/CoverList";
import PopularCoverList from "../../components/aiCover/PopularCoverList";
import { useNavigate } from "react-router";
import { Button } from "../../components/common/Button";




const ColorBlock = styled.div`
  width: 100%;
  height: 11rem;
  background: linear-gradient(90deg, rgba(225, 165, 255, 0.5) 0%, rgba(229, 151, 249, 0.5) 12.97%, rgba(255, 55, 211, 0.5) 100%), #FDFF00;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  .description {
    font-size: 1.5rem;
    color: white;
    margin-bottom: 0.5rem;
  }
`

const Title = styled.h1`
  font-family: "PyeongChangPeace-Bold";
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.5);
  -webkit-text-stroke: 1px white;
`

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  
  .title {
    font-size: 2.5rem;
    font-family: 'GmarketSansBold';
    width: 80%;
  };
`

const CoverListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.75rem;
  margin-bottom: 2rem;
`


const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; 
  margin-bottom: 2rem;
`;

const DetailLine = styled.div`
  height: 2px;
  width: 1300px;
  background-color: #A3A3A3;
  margin: 0.5rem 0;
`;

// 커버 전체 목록 페이지
const CoverListPage: React.FC = () => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState<CoverListInterface['data']>({ covers: [], totalPages: 0 });
  const [popularDataList, setPopularDataList] = useState<CoverListInterface['data']>({ covers: [], totalPages: 0 });

  useEffect(() => {
    (async () => {
      try {
        const data = await getCovers();
        setDataList({
          covers: data.covers,
          totalPages: data.totalPages
        });

        const popularData = await getPopularCovers();
        setPopularDataList({
          covers: popularData.covers,
          totalPages: popularData.totalPages
        });
      } catch (error) {
        console.error("커버 데이터를 가져오는데 실패했습니다.");
      }
    })();
  }, []);

  return (
    <>
      <ColorBlock>
        <div className="flex ml-32 items-end gap-4">
          <Title>AI 노래방</Title>
          <p className="description">나만의 노래 커버를 만들어 보세요!</p>
        </div>
      </ColorBlock>
      <Container>
        <h2 className="title">Hot Contents</h2>
        <ButtonContainer>
          <Button onClick={() => navigate("/cover/create")} $marginLeft={0} $marginTop={0}>나만의 커버 만들기</Button>
        </ButtonContainer>
        <PopularCoverList data={popularDataList} />
        <DetailLine />
        <CoverListContainer>
        <CoverList data={dataList} />
        </CoverListContainer>
      </Container>
    </>
  );
};

export default CoverListPage;