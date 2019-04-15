#!/usr/bin/env bash

echo Loading I/O

: ${INPUT? ❌ not set}

color () {
  echo color=c=$1 # :s=700x200 Sizing
}

snow () {
  local graph="-i nullsrc=s=256x256:d=5 -vf geq=random(1)*255:128:128"
  echo nullsrc
}

format () {
  # image2 for still frames
  # lavfi for blank image - https://www.ffmpeg.org/ffmpeg-devices.html#lavfi
  ( test ! -f "$INPUT"  && echo lavfi ) || \
  ( echo mp4 )
}

open () {
  test -f "$1" && echo $1
}

# SEEKING https://trac.ffmpeg.org/wiki/Seeking
# *** SEEK BEFORE INPUT for cover image ***
seek () {
  local start=$( test $START && echo -ss $START )
  local stop=$(  test $STOP  && echo -to $STOP  )
  local duration= # -t 10  # seek duration time (precedence over -to)

  echo $start $duration $stop
}

declare -r IN="-i $( open "$INPUT" || color $INPUT )"
declare -r OUT=${OUTPUT:-"-y /dev/null"}
declare -r FORMAT="-f $(format)"

# SEEKING https://trac.ffmpeg.org/wiki/Seeking
# *** SEEK BEFORE INPUT for cover image ***
declare -r SEEK="$(seek)"

echo IN $IN
echo OUT $OUT
echo SEEK $SEEK
echo FORMAT $FORMAT
