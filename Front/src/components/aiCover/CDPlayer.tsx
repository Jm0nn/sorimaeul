import styled from "styled-components";
import { Cover } from "./CoverInterface";
import { useNavigate } from "react-router";
import heart from "../../assets/heart.png";

const CDContainer = styled.div`
  position: relative;
  padding: 20px;
  width: 18rem;
  height: 22rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -145%);
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: white;
    z-index: 2;
  }
`;

const StyledImage = styled.img`
  border-radius: 50%;
  width: 13rem;
  height: 13rem;
  object-fit: cover;
  margin: 0 auto 10px auto;
  margin-bottom: 10px; 
  display: block; 
  position: relative; 
  z-index: 1;  
`;

const CoverTitle = styled.p`
  font-size: 1.3rem; 
  margin-bottom: 5px; 
`;

const ProfileSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 13px;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 35px; 
  height: 35px;
  object-fit: cover;
  margin-top: 7px;
`;

const Nickname = styled.p`
  flex-grow: 1;
  margin-left: 10px;
  font-size: 0.875rem; 
  color: #575757;
`;

const LikeSection = styled.div`
  display: flex;
  align-items: center;
`;

const LikeImage = styled.img`
  width: 24px; 
  height: 24px;
  margin-right: 5px; 
`;

const LikeCount = styled.p`
  font-size: 0.875rem; 
  margin-top: 4px;
`;

const SongInfo = styled.p`
  font-size: 0.7rem; 
  font-family: 
  color: #A3A3A3;
`;

interface Props {
  cover: Cover;
}

const CDPlayer: React.FC<Props> = ({ cover }) => {
  const {
    coverCode,
    coverName,
    thumbnailPath,
    nickname,
    likeCount,
    coverSinger,
    singer,
    title,
  } = cover;
  const navigate = useNavigate();

  return (
    <CDContainer onClick={() => navigate(`/cover/${coverCode}`)}>
      <StyledImage src={thumbnailPath} alt={title} />
      <CoverTitle>{coverName}</CoverTitle>
      <ProfileSection>
        <ProfileImage src="/path/to/profile/image.jpg" alt="Profile" /> {/* 프로필 이미지 경로 수정 필요 */}
        <Nickname>{nickname}</Nickname>
        <LikeSection>
          <LikeImage src={heart} alt="Like" />
          <LikeCount>{likeCount}</LikeCount>
        </LikeSection>
      </ProfileSection>
      <SongInfo>
        {singer} - {title} ({coverSinger})
      </SongInfo>
    </CDContainer>
  );
};

export default CDPlayer;
