#!/bin/bash
set -eo pipefail
#---------------------------------------------init scripts----------------------------------------------#
export _GREEN='\033[0;32m';
export _BLUE='\033[0;36m';
export _RED='\033[0;31m';
export _YLW='\033[0;33m';
export _NC='\033[0m'; # No Color
export _PREFIX_OUT="${_BLUE}> ";
export _POSTFIX_OUT="${_NC}";

check_env_vars_set(){
    _exit_code=0;

    if [ -p /dev/stdin ]; then
        while IFS= read line; do
            if [[ -z "${!line}" ]]; then
                echo -e "${_RED}check_env_vars_set(): Variable not set $line"
                _exit_code=1;
            fi
        done

    else
    echo -e "${_RED}check_env_vars_set(): Invalid: No piped variables specified${_NC}"
    _exit_code=1;
    fi

    exit $_exit_code;
  
}

send_output() {
  echo -e "${_PREFIX_OUT}$1 ${_POSTFIX_OUT}";
}

#--------------------------------------------/init scripts----------------------------------------------#




{
cat <<EOF
CHECK_RESPONSE__URL
CHECK_RESPONSE__EXPECT_STATUS_CODE
EOF
} | check_env_vars_set


while :
do

_response_status_code=$(curl --silent --output /dev/stderr --write-out "%{http_code}" ${CHECK_RESPONSE__URL} || echo "");

if [[ $_response_status_code == "${CHECK_RESPONSE__EXPECT_STATUS_CODE}" ]]; then
     send_output "${_GREEN}debug: CHECK_RESPONSE__URL: ${CHECK_RESPONSE__URL} returned matching status code: ${CHECK_RESPONSE__EXPECT_STATUS_CODE}";
    exit 0
else
 send_output "${_YLW}debug: CHECK_RESPONSE__URL: ${CHECK_RESPONSE__URL} returned non-matching http code: expected: ${CHECK_RESPONSE__EXPECT_STATUS_CODE}, actual: ${_response_status_code}";
 echo $response;
fi

sleep 2;

done

