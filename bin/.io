#!/usr/bin/env bash

: ${INPUT? ❌ not set}

echo INPUT  $INPUT
echo OUTPUT $OUTPUT

declare -rx  IN="-i $INPUT"
declare -rx  OUT=${OUTPUT:-dev/null}

# SEEKING https://trac.ffmpeg.org/wiki/Seeking
# *** SEEK BEFORE INPUT for cover image ***
declare -r  START="-ss 00:00:00" # seek start time offset
declare -r  DURATION="-t 60"   # seek duration time (precedence over -to)
declare -r  END= #"-to [end]"       # seek end time
declare -r  SEEK="$START $DURATION $END"

