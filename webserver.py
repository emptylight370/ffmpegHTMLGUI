# encoding:utf-8
import asyncio
import websockets
import os


async def echo(websocket):
    async for message in websocket:
        print("message:" + message)
        if message[:6] == "ffmpeg":
            os.system(message)
            await websocket.send("run command")
            print("运行命令完成")
        elif message == "start":
            await websocket.send("link start")
        else:
            await websocket.send("receive")


async def main():
    async with websockets.serve(echo, "localhost", 1652):
        print("start server")
        print("version:1.0")
        print("update date:2023.08.03")
        await asyncio.Future()  # run forever


asyncio.run(main())
