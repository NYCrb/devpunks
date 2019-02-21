#!/usr/bin/env bash

echo Loading I/O

: ${INPUT? ❌ not set}

open () {
  test -f $1 && echo $1
}

format () {
  local output=$1

  ( test   "$OUTPUT"   && echo mp4   ) || \
  ( test ! "$OUTPUT"   && echo null  ) || \ # https://trac.ffmpeg.org/wiki/Null
  ( test ! -f "$INPUT" && echo lavfi )
}

# SEEKING https://trac.ffmpeg.org/wiki/Seeking
# *** SEEK BEFORE INPUT for cover image ***
declare -r  START="-ss 00:00:00" # seek start time offset
declare -r  DURATION="-t 60"   # seek duration time (precedence over -to)
declare -r  END= #"-to [end]"       # seek end time
declare -r  SEEK="$START $DURATION $END"

echo INPUT  $INPUT
echo OUTPUT $OUTPUT


# color=c=$COLOR:s=widthxheight:d=duration
declare -rx  IN="-i $( ( test -f $INPUT && echo $INPUT ) || echo color=c=$INPUT)"
declare -rx  OUT=${OUTPUT:-dev/null}

# lavfi for blank image
declare -r  FORMAT="-f $( format $OUTPUT )" # image2 for still frames

echo IN $IN
echo FORMAT $FORMAT
