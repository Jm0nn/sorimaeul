import styled from "styled-components";
import { Cover } from "./CoverInterface";
import { useNavigate } from "react-router";
import heart from "../../assets/heart.png";


const CDContainer = styled.div`
  cursor: pointer;
`;

const CoverTitle = styled.p`
  font-size: 1rem; 
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: 50%; 
  overflow: hidden;
`

const ThumbnailImage = styled.img`
  width: 100%; 
  height: auto; 
  border-radius: 50%;
  z-index: 1;
`;

const CenterCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px; 
  height: 50px; 
  border-radius: 50%; 
  background: white; 
  z-index: 2;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
`;

const ProfileImage = styled.img`
  width: 30px; 
  height: 30px;
  border-radius: 50%; 
  margin-right: 0.5rem;
`;

const Nickname = styled.p`
  flex-grow: 1;
  margin-left: 10px;
  margin-top: 1rem;
  
  font-size: 14px; 
  color: #575757;
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeartIcon = styled.img`
  width: 20px; 
  height: auto; 
  margin-right: 10px;
`;

const LikeCount = styled.p`
  font-size: 0.875rem; 
  margin-top: 4px;
`;

const SongInfo = styled.p`
  width: 220px;
  font-size: 0.7rem; 
  color: #A3A3A3;
  text-overflow: ellipsis;
`;

interface Props {
  cover: Cover;
}

const CDPlayer: React.FC<Props> = ({ cover }) => {
  const {
    coverCode,
    coverName,
    thumbnailPath,
    profileImage,
    nickname,
    likeCount,
    coverSinger,
    singer,
    title,
  } = cover;
  const navigate = useNavigate();
  console.log(cover);
  return (
    <CDContainer onClick={() => navigate(`/cover/${coverCode}`)}>
      <ThumbnailContainer>
      <ThumbnailImage src={thumbnailPath} alt={title} />
      <CenterCircle />
      </ThumbnailContainer>
      <CoverTitle>{coverName}</CoverTitle>
      <ProfileInfo >
        <ProfileImage src={profileImage} alt="Profile" /> {/* 프로필 이미지 경로 수정 필요 */}
        <Nickname>{nickname}</Nickname>
        <LikeContainer>
          <HeartIcon src={heart} alt="Like" />
          <LikeCount>{likeCount}</LikeCount>
        </LikeContainer>
      </ProfileInfo>
      <SongInfo>
        {singer} - {title} ({coverSinger})
      </SongInfo>
    </CDContainer>
  );
};

export default CDPlayer;