# `bin/`


## `arguments`

  Parse arguments


## `encode`

  To summarize, here’s what you should do, depending on your use case:

  - Archival — CRF that gives you the quality you want.
  - Streaming — Two-pass CRF or ABR with VBV-constained bitrate.
  - Live Streaming — One-pass CRF or ABR with VBV-constained bitrate, or CBR if you can waste bits.
  - Encoding for Devices — Two-pass ABR, typically.


### References

  - Youtube settings
    - https://support.google.com/youtube/answer/1722171?hl=en
    - https://superuser.com/questions/866798/what-ffmpeg-command-line-matches-the-one-youtube-uses
  - Video Conversion for Cross Device with FFmpeg - https://gist.github.com/jaydenseric/220c785d6289bcfd7366
  - #Social Media Video encodings - https://trac.ffmpeg.org/wiki/Encode/YouTube
  - FFMPEG and How to Use It Wrong - https://videoblerg.wordpress.com/2017/11/10/ffmpeg-and-how-to-use-it-wrong/
  - ARCH Linux FFMPEG Man(ual) - https://wiki.archlinux.org/index.php/FFmpeg
  - RATE CONTROL - https://slhck.info/video/2017/03/01/rate-control.html
  - Video encoding guide - https://trac.ffmpeg.org/wiki/Encode/H.264
  - FFMPEG MAPPING FLAGS - https://sites.google.com/site/linuxencoding/x264-ffmpeg-mapping
  - Send output stream to dev/null - https://stackoverflow.com/questions/20323640/ffmpeg-deocde-without-producing-output-file#answer-20325676
  - [A.I. Encoding](https://bitmovin.com/chunk-based-3-pass-video-encoding-uses-machine-learning-deliver-unrivalled-quality/)
