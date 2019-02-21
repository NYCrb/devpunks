#!/usr/bin/env bash

echo Loading I/O

: ${INPUT? ❌ not set}

color () {
  local color=$1

}

format () {
  ( test ! -f "$INPUT"  && echo lavfi ) || echo mp4
}

open () {
  test -f $1 && echo $1
}

# SEEKING https://trac.ffmpeg.org/wiki/Seeking
# *** SEEK BEFORE INPUT for cover image ***
declare -r START="-ss 00:00:00" # seek start time offset
declare -r DURATION="-t 60"   # seek duration time (precedence over -to)
declare -r END= #"-to [end]"       # seek end time
declare -r SEEK="$START $DURATION $END"


# color=c=$COLOR:s=widthxheight:d=duration
declare -r IN="-i $( open $INPUT || color $INPUT )"
declare -r OUT=${OUTPUT:-"-y /dev/null"}

# lavfi for blank image
declare -r FORMAT="-f $(format)" # image2 for still frames

echo IN $IN
echo OUT $OUT
echo FORMAT $FORMAT
