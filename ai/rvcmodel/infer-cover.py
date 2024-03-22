from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from AI_Cover_Creator import Creator, TooLongYoutubeException

import pytube.exceptions as ex

import os, shutil
import requests
import logging

logger = logging.getLogger(__name__)

cur_dir = os.getcwd()
cover_path = f"{cur_dir}/cover"

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Request(BaseModel):
    youtubeURL: str
    userCode: int
    modelCode: int
    coverCode: int
    coverName: str
    pitch: int


# AI 커버 제작
def create_cover(request: Request):
    userCode = request.userCode
    coverCode = request.coverCode
    coverName = request.coverName

    try:
        output = Creator(request).create()

        file = open(output, 'rb')
        upload = {'file': file}
        
        try:
            # 커버 업로드
            logger.info("Cover upload")
            response = requests.post(f"https://j10e201.p.ssafy.io/api/cover/{coverCode}", files=upload)
            response.raise_for_status()
            logger.info(f"Response status {response.status_code}")
            msg = f'AI 커버 "{coverName}" 제작이 완료되었습니다.'
            sendNotification(userCode, msg)
        except requests.exceptions.RequestException as e:
            logger.info(f"Error occurred: {e}")
            msg = f'AI 커버 "{coverName}" 제작에 실패했습니다.'
            sendNotification(userCode, msg)

        file.close()

    except TooLongYoutubeException as e:
        logger.info(f"Youtube error : {e}")
        msg = f'AI 커버 "{coverName}"의 유튜브 영상 길이가 10분이 넘습니다.'
        sendNotification(userCode, msg)
        return
    
    except (ex.PytubeError,
            ex.MaxRetriesExceeded,
            ex.HTMLParseError,
            ex.ExtractError,
            ex.RegexMatchError,
            ex.VideoUnavailable,
            ex.AgeRestrictedError,
            ex.LiveStreamError,
            ex.VideoPrivate,
            ex.RecordingUnavailable,
            ex.MembersOnly,
            ex.VideoRegionBlocked) as e:
        logger.info(f"Youtube error : {e}")
        msg = f'AI 커버 "{coverName}"의 유튜브에 접근할 수 없습니다.'
        sendNotification(userCode, msg)
        return
    
    except Exception as e:
        logger.info(f"Error occurred: {e}")
        msg = f'AI 커버 "{coverName}" 제작에 실패했습니다.'
        sendNotification(userCode, msg)
        return
    
    finally:
        # 폴더 삭제
        if os.path.exists(f"{cover_path}/{userCode}/{coverCode}"):
            shutil.rmtree(f"{cover_path}/{userCode}/{coverCode}")
            logger.info(f"Remove {cover_path}/{userCode}/{coverCode}")


# 알림 전송
def sendNotification(userCode, msg):
    logger.info("Send notification")
    try:
        response = requests.post(f"https://j10e201.p.ssafy.io/api/sse/notify",
                                 json={"userCode":userCode, "data":msg})
        logger.info(f"Response status {response.status_code}")
    except requests.exceptions.RequestException as e:
        logger.info(f"Error occurred: {e}")


# AI 커버 제작 요청
@app.post('/rvc/cover')
def cover(request: Request, background_tasks: BackgroundTasks):
    background_tasks.add_task(create_cover, request)
    return {"status": 200, "message": "Process accepted"}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app=app, host='0.0.0.0', port=7866)