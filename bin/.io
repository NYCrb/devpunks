#!/usr/bin/env bash

echo Loading I/O

: ${INPUT? ❌ not set}

# SEEKING https://trac.ffmpeg.org/wiki/Seeking
# *** SEEK BEFORE INPUT for cover image ***
declare -r  START="-ss 00:00:00" # seek start time offset
declare -r  DURATION="-t 60"   # seek duration time (precedence over -to)
declare -r  END= #"-to [end]"       # seek end time
declare -r  SEEK="$START $DURATION $END"

declare -r  FORMAT=$( ( test ! "$OUTPUT" && echo -f null ) || echo -f mp4 ) # image2 for still frames
