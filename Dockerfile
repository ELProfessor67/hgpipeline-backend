FROM node

WORKDIR /app/backend

COPY . /app/backend/

RUN npm install
EXPOSE 3000

ENV SECRET_KEY=045c7e8326ccf996d72b3b88184c2a8a2947e896c5a957b197c55245316c1adb13d912147b835c99e7435b32da556388f6d9hhjhkhkk
ENV EMAIL=wi223488@gmail.com
ENV PASSWORD=plyzrdrnshkhscax
ENV DB_URL=mongodb+srv://tikeng786:lXA6nEXyymU0JFD9@cluster0.u8ivjmj.mongodb.net/hgpipeline?retryWrites=true&w=majority
ENV FRONTEND_URL=https://hgpipeline.com
ENV AI_SERVER=https://recommendations-server.hgpipeline.com
ENV RTMP_SERVER_HOST=rtmp://rtmp.hgpipeline.com/live
ENV HLS_SERVER_HOST=https://hls.hgpipeline.com/live

CMD ["node", "server.js"]
