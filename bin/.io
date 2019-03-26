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
  # lavfi - https://www.ffmpeg.org/ffmpeg-devices.html#lavfi
  ( test ! -f "$INPUT"  && echo lavfi ) || \
  ( echo mp4 )
}

open () {
  test -f $1 && echo $1
}

# SEEKING https://trac.ffmpeg.org/wiki/Seeking
# *** SEEK BEFORE INPUT for cover image ***


seek () {
  local start=00:00:00
  local end=$( test $END && echo -t0 $END )
  local duration= # -t 10

  echo SEEK AND DESTROY! -ss $start $duration $end
}

seek

declare -r START=$( test -f $1 && echo -ss 00:00:00 ) # seek start time offset
declare -r DURATION="-t 10"   # seek duration time (precedence over -to)
declare -r END=$( test -f $1 && echo -to -END )
declare -r SEEK="$START $"
declare -r IN="-i $( open $INPUT || color $INPUT )"
declare -r OUT=${OUTPUT:-"-y /dev/null"}

# lavfi for blank image
declare -r FORMAT="-f $(format)" # image2 for still frames

echo IN $IN
echo OUT $OUT
echo FORMAT $FORMAT
