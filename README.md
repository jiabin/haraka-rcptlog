haraka-rcptlog
==============

Simple [haraka](http://haraka.github.io) plugin for logging sent emails.


## Installing

Download the plugin and copy contents of `plugins` and `config` folders into your haraka configuration.

Once copied you can now enable the plugin by modifying `/path/to/haraka_conf/conf/plugins` file:
```
# /path/to/haraka_conf/conf/plugins
rcptlog
```

## Configuration

To overwrite default configuration values you need to modify `/path/to/haraka_conf/conf/rcptlog.ini` file.

```
; Log directory
logdir=/var/log/haraka   

; Output format. Available formats are: text, json
format=text
```

## Uninstalling

Simply remove `plugins/rcptlog.js` and `config/rcptlog.ini`. Don't forget to disable the plugin in your `conf/plugins` file.