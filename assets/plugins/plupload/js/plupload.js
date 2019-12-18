/*1.5.1.1*/
(function() {
  /**
   * @return {undefined}
   */
  function preventDefault() {
    /** @type {boolean} */
    this.returnValue = false;
  }
  /**
   * @return {undefined}
   */
  function stopPropagation() {
    /** @type {boolean} */
    this.cancelBubble = true;
  }
  /** @type {number} */
  var UID = 0;
  /** @type {Array} */
  var runtimes = [];
  var i18n = {};
  var mimes = {};
  var xmlEncodeChars = {
    "<" : "lt",
    ">" : "gt",
    "&" : "amp",
    '"' : "quot",
    "'" : "#39"
  };
  /** @type {RegExp} */
  var r20 = /[<>&\"\']/g;
  var undef;
  /** @type {function (this:Window, (Function|null|string), number, ...[*]): number} */
  var delay = window.setTimeout;
  var eventhash = {};
  var uid;
  (function(pair) {
    /** @type {Array.<string>} */
    var codeSegments = pair.split(/,/);
    var i;
    var y;
    var ext;
    /** @type {number} */
    i = 0;
    for (;i < codeSegments.length;i += 2) {
      /** @type {Array.<string>} */
      ext = codeSegments[i + 1].split(/ /);
      /** @type {number} */
      y = 0;
      for (;y < ext.length;y++) {
        /** @type {string} */
        mimes[ext[y]] = codeSegments[i];
      }
    }
  })("application/msword,doc dot,application/pdf,pdf,application/pgp-signature,pgp,application/postscript,ps ai eps,application/rtf,rtf,application/vnd.ms-excel,xls xlb,application/vnd.ms-powerpoint,ppt pps pot,application/zip,zip,application/x-shockwave-flash,swf swfl,application/vnd.openxmlformats,docx pptx xlsx,audio/mpeg,mpga mpega mp2 mp3,audio/x-wav,wav,audio/mp4,m4a,image/bmp,bmp,image/gif,gif,image/jpeg,jpeg jpg jpe,image/photoshop,psd,image/png,png,image/svg+xml,svg svgz,image/tiff,tiff tif,text/html,htm html xhtml,text/rtf,rtf,video/mpeg,mpeg mpg mpe,video/quicktime,qt mov,video/mp4,mp4,video/x-m4v,m4v,video/x-flv,flv,video/x-ms-wmv,wmv,video/avi,avi,video/webm,webm,video/vnd.rn-realvideo,rv,text/csv,csv,text/plain,asc txt text diff log,application/octet-stream,exe");
  var plupload = {
    VERSION : "1.5.1.1",
    STOPPED : 1,
    STARTED : 2,
    QUEUED : 1,
    UPLOADING : 2,
    FAILED : 4,
    DONE : 5,
    GENERIC_ERROR : -100,
    HTTP_ERROR : -200,
    IO_ERROR : -300,
    SECURITY_ERROR : -400,
    INIT_ERROR : -500,
    FILE_SIZE_ERROR : -600,
    FILE_EXTENSION_ERROR : -601,
    IMAGE_FORMAT_ERROR : -700,
    IMAGE_MEMORY_ERROR : -701,
    IMAGE_DIMENSIONS_ERROR : -702,
    mimeTypes : mimes,
    ua : function() {
      /** @type {(Navigator|null)} */
      var nav = navigator;
      /** @type {string} */
      var userAgent = nav.userAgent;
      /** @type {string} */
      var vendor = nav.vendor;
      var webkit;
      var n;
      var safari;
      /** @type {boolean} */
      webkit = /WebKit/.test(userAgent);
      /** @type {boolean} */
      safari = webkit && vendor.indexOf("Apple") !== -1;
      n = window.opera && window.opera.buildNumber;
      return{
        windows : navigator.platform.indexOf("Win") !== -1,
        ie : !webkit && (!n && (/MSIE/gi.test(userAgent) && /Explorer/gi.test(nav.appName))),
        webkit : webkit,
        gecko : !webkit && /Gecko/.test(userAgent),
        safari : safari,
        opera : !!n
      };
    }(),
    /**
     * @param {Array} target
     * @return {?}
     */
    extend : function(target) {
      plupload.each(arguments, function(events, dataAndEvents) {
        if (dataAndEvents > 0) {
          plupload.each(events, function(value, key) {
            target[key] = value;
          });
        }
      });
      return target;
    },
    /**
     * @param {string} name
     * @return {?}
     */
    cleanName : function(name) {
      var i;
      var lookup;
      /** @type {Array} */
      lookup = [/[\300-\306]/g, "A", /[\340-\346]/g, "a", /\307/g, "C", /\347/g, "c", /[\310-\313]/g, "E", /[\350-\353]/g, "e", /[\314-\317]/g, "I", /[\354-\357]/g, "i", /\321/g, "N", /\361/g, "n", /[\322-\330]/g, "O", /[\362-\370]/g, "o", /[\331-\334]/g, "U", /[\371-\374]/g, "u"];
      /** @type {number} */
      i = 0;
      for (;i < lookup.length;i += 2) {
        name = name.replace(lookup[i], lookup[i + 1]);
      }
      name = name.replace(/\s+/g, "_");
      name = name.replace(/[^a-z0-9_\-\.]+/gi, "");
      return name;
    },
    /**
     * @param {string} name
     * @param {Function} runtime
     * @return {?}
     */
    addRuntime : function(name, runtime) {
      /** @type {string} */
      runtime.name = name;
      /** @type {Function} */
      runtimes[name] = runtime;
      runtimes.push(runtime);
      return runtime;
    },
    /**
     * @return {?}
     */
    guid : function() {
      /** @type {string} */
      var guid = (new Date).getTime().toString(32);
      var o;
      /** @type {number} */
      o = 0;
      for (;o < 5;o++) {
        guid += Math.floor(Math.random() * 65535).toString(32);
      }
      return(plupload.guidPrefix || "p") + guid + (UID++).toString(32);
    },
    /**
     * @param {string} url
     * @param {Object} items
     * @return {?}
     */
    buildUrl : function(url, items) {
      /** @type {string} */
      var query = "";
      plupload.each(items, function(sectionName, name) {
        query += (query ? "&" : "") + encodeURIComponent(name) + "=" + encodeURIComponent(sectionName);
      });
      if (query) {
        url += (url.indexOf("?") > 0 ? "&" : "?") + query;
      }
      return url;
    },
    /**
     * @param {Object} obj
     * @param {Function} func
     * @return {undefined}
     */
    each : function(obj, func) {
      var length;
      var prop;
      var i;
      if (obj) {
        length = obj.length;
        if (length === undef) {
          for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
              if (func(obj[prop], prop) === false) {
                return;
              }
            }
          }
        } else {
          /** @type {number} */
          i = 0;
          for (;i < length;i++) {
            if (func(obj[i], i) === false) {
              return;
            }
          }
        }
      }
    },
    /**
     * @param {number} size
     * @return {?}
     */
    formatSize : function(size) {
      if (size === undef || /\D/.test(size)) {
        return plupload.translate("N/A");
      }
      if (size > 1073741824) {
        return Math.round(size / 1073741824, 1) + " GB";
      }
      if (size > 1048576) {
        return Math.round(size / 1048576, 1) + " MB";
      }
      if (size > 1024) {
        return Math.round(size / 1024, 1) + " KB";
      }
      return size + " b";
    },
    /**
     * @param {Element} node
     * @param {Element} root
     * @return {?}
     */
    getPos : function(node, root) {
      /**
       * @param {Element} node
       * @return {?}
       */
      function getIEPos(node) {
        var b;
        var p;
        /** @type {number} */
        var moveX = 0;
        /** @type {number} */
        var moveY = 0;
        if (node) {
          p = node.getBoundingClientRect();
          /** @type {(Element|null)} */
          b = doc.compatMode === "CSS1Compat" ? doc.documentElement : doc.body;
          moveX = p.left + b.scrollLeft;
          moveY = p.top + b.scrollTop;
        }
        return{
          x : moveX,
          y : moveY
        };
      }
      /** @type {number} */
      var moveX = 0;
      /** @type {number} */
      var moveY = 0;
      var parent;
      /** @type {HTMLDocument} */
      var doc = document;
      var nodeRect;
      var rootRect;
      /** @type {Element} */
      node = node;
      root = root || doc.body;
      if (node && (node.getBoundingClientRect && (navigator.userAgent.indexOf("MSIE") > 0 && doc.documentMode !== 8))) {
        nodeRect = getIEPos(node);
        rootRect = getIEPos(root);
        return{
          x : nodeRect.x - rootRect.x,
          y : nodeRect.y - rootRect.y
        };
      }
      /** @type {Element} */
      parent = node;
      for (;parent && (parent != root && parent.nodeType);) {
        moveX += parent.offsetLeft || 0;
        moveY += parent.offsetTop || 0;
        parent = parent.offsetParent;
      }
      parent = node.parentNode;
      for (;parent && (parent != root && parent.nodeType);) {
        moveX -= parent.scrollLeft || 0;
        moveY -= parent.scrollTop || 0;
        parent = parent.parentNode;
      }
      return{
        x : moveX,
        y : moveY
      };
    },
    /**
     * @param {HTMLElement} elm
     * @return {?}
     */
    getSize : function(elm) {
      return{
        w : elm.offsetWidth || elm.clientWidth,
        h : elm.offsetHeight || elm.clientHeight
      };
    },
    /**
     * @param {number} size
     * @return {?}
     */
    parseSize : function(size) {
      var mul;
      if (typeof size == "string") {
        /** @type {(Array.<string>|null)} */
        size = /^([0-9]+)([mgk]?)$/.exec(size.toLowerCase().replace(/[^0-9mkg]/g, ""));
        /** @type {string} */
        mul = size[2];
        /** @type {number} */
        size = +size[1];
        if (mul == "g") {
          size *= 1073741824;
        }
        if (mul == "m") {
          size *= 1048576;
        }
        if (mul == "k") {
          size *= 1024;
        }
      }
      return size;
    },
    /**
     * @param {?} s
     * @return {?}
     */
    xmlEncode : function(s) {
      return s ? ("" + s).replace(r20, function(chr) {
        return xmlEncodeChars[chr] ? "&" + xmlEncodeChars[chr] + ";" : chr;
      }) : s;
    },
    /**
     * @param {Array} ar
     * @return {?}
     */
    toArray : function(ar) {
      var i;
      /** @type {Array} */
      var a = [];
      /** @type {number} */
      i = 0;
      for (;i < ar.length;i++) {
        a[i] = ar[i];
      }
      return a;
    },
    /**
     * @param {?} pack
     * @return {?}
     */
    addI18n : function(pack) {
      return plupload.extend(i18n, pack);
    },
    /**
     * @param {string} str
     * @return {?}
     */
    translate : function(str) {
      return i18n[str] || str;
    },
    /**
     * @param {?} obj
     * @return {?}
     */
    isEmptyObj : function(obj) {
      if (obj === undef) {
        return true;
      }
      var prop;
      for (prop in obj) {
        return false;
      }
      return true;
    },
    /**
     * @param {Element} node
     * @param {string} name
     * @return {?}
     */
    hasClass : function(node, name) {
      var nocode;
      if (node.className == "") {
        return false;
      }
      /** @type {RegExp} */
      nocode = new RegExp("(^|\\s+)" + name + "(\\s+|$)");
      return nocode.test(node.className);
    },
    /**
     * @param {Element} obj
     * @param {string} name
     * @return {undefined}
     */
    addClass : function(obj, name) {
      if (!plupload.hasClass(obj, name)) {
        obj.className = obj.className == "" ? name : obj.className.replace(/\s+$/, "") + " " + name;
      }
    },
    /**
     * @param {Element} domElement
     * @param {string} classNames
     * @return {undefined}
     */
    removeClass : function(domElement, classNames) {
      /** @type {RegExp} */
      var reg = new RegExp("(^|\\s+)" + classNames + "(\\s+|$)");
      domElement.className = domElement.className.replace(reg, function(ignoreMethodDoesntExist, dataAndEvents, deepDataAndEvents) {
        return dataAndEvents === " " && deepDataAndEvents === " " ? " " : "";
      });
    },
    /**
     * @param {Element} el
     * @param {string} cssprop
     * @return {?}
     */
    getStyle : function(el, cssprop) {
      if (el.currentStyle) {
        return el.currentStyle[cssprop];
      } else {
        if (window.getComputedStyle) {
          return window.getComputedStyle(el, null)[cssprop];
        }
      }
    },
    /**
     * @param {HTMLElement} obj
     * @param {string} name
     * @param {Function} callback
     * @return {undefined}
     */
    addEvent : function(obj, name, callback) {
      var func;
      var events;
      var p;
      var element;
      element = arguments[3];
      name = name.toLowerCase();
      if (uid === undef) {
        /** @type {string} */
        uid = "Plupload_" + plupload.guid();
      }
      if (obj.addEventListener) {
        /** @type {Function} */
        func = callback;
        obj.addEventListener(name, func, false);
      } else {
        if (obj.attachEvent) {
          /**
           * @return {undefined}
           */
          func = function() {
            var e = window.event;
            if (!e.target) {
              e.target = e.srcElement;
            }
            /** @type {function (): undefined} */
            e.preventDefault = preventDefault;
            /** @type {function (): undefined} */
            e.stopPropagation = stopPropagation;
            callback(e);
          };
          obj.attachEvent("on" + name, func);
        }
      }
      if (obj[uid] === undef) {
        obj[uid] = plupload.guid();
      }
      if (!eventhash.hasOwnProperty(obj[uid])) {
        eventhash[obj[uid]] = {};
      }
      events = eventhash[obj[uid]];
      if (!events.hasOwnProperty(name)) {
        /** @type {Array} */
        events[name] = [];
      }
      events[name].push({
        func : func,
        /** @type {Function} */
        orig : callback,
        key : element
      });
    },
    /**
     * @param {Element} obj
     * @param {string} name
     * @return {undefined}
     */
    removeEvent : function(obj, name) {
      var list;
      var callback;
      var key;
      if (typeof arguments[2] == "function") {
        callback = arguments[2];
      } else {
        key = arguments[2];
      }
      name = name.toLowerCase();
      if (obj[uid] && (eventhash[obj[uid]] && eventhash[obj[uid]][name])) {
        list = eventhash[obj[uid]][name];
      } else {
        return;
      }
      /** @type {number} */
      var i = list.length - 1;
      for (;i >= 0;i--) {
        if (list[i].key === key || list[i].orig === callback) {
          if (obj.detachEvent) {
            obj.detachEvent("on" + name, list[i].func);
          } else {
            if (obj.removeEventListener) {
              obj.removeEventListener(name, list[i].func, false);
            }
          }
          /** @type {null} */
          list[i].orig = null;
          /** @type {null} */
          list[i].func = null;
          list.splice(i, 1);
          if (callback !== undef) {
            break;
          }
        }
      }
      if (!list.length) {
        delete eventhash[obj[uid]][name];
      }
      if (plupload.isEmptyObj(eventhash[obj[uid]])) {
        delete eventhash[obj[uid]];
        try {
          delete obj[uid];
        } catch (r) {
          obj[uid] = undef;
        }
      }
    },
    /**
     * @param {Element} obj
     * @return {undefined}
     */
    removeAllEvents : function(obj) {
      var key = arguments[1];
      if (obj[uid] === undef || !obj[uid]) {
        return;
      }
      plupload.each(eventhash[obj[uid]], function(dataAndEvents, name) {
        plupload.removeEvent(obj, name, key);
      });
    }
  };
  /**
   * @param {Object} settings
   * @return {undefined}
   */
  plupload.Uploader = function(settings) {
    /**
     * @return {undefined}
     */
    function uploadNext() {
      var file;
      /** @type {number} */
      var files_done = 0;
      var i;
      if (this.state == plupload.STARTED) {
        /** @type {number} */
        i = 0;
        for (;i < files.length;i++) {
          if (!file && files[i].status == plupload.QUEUED) {
            file = files[i];
            /** @type {number} */
            file.status = plupload.UPLOADING;
            if (this.trigger("BeforeUpload", file)) {
              this.trigger("UploadFile", file);
            }
          } else {
            files_done++;
          }
        }
        if (files_done == files.length) {
          this.stop();
          this.trigger("UploadComplete", files);
        }
      }
    }
    /**
     * @return {undefined}
     */
    function calc() {
      var f;
      var file;
      total.reset();
      /** @type {number} */
      f = 0;
      for (;f < files.length;f++) {
        file = files[f];
        if (file.size !== undef) {
          total.size += file.size;
          total.loaded += file.loaded;
        } else {
          total.size = undef;
        }
        if (file.status == plupload.DONE) {
          total.uploaded++;
        } else {
          if (file.status == plupload.FAILED) {
            total.failed++;
          } else {
            total.queued++;
          }
        }
      }
      if (total.size === undef) {
        /** @type {number} */
        total.percent = files.length > 0 ? Math.ceil(total.uploaded / files.length * 100) : 0;
      } else {
        /** @type {number} */
        total.bytesPerSec = Math.ceil(total.loaded / ((+new Date - p || 1) / 1E3));
        /** @type {number} */
        total.percent = total.size > 0 ? Math.ceil(total.loaded / total.size * 100) : 0;
      }
    }
    var events = {};
    var total;
    /** @type {Array} */
    var files = [];
    var p;
    total = new plupload.QueueProgress;
    settings = plupload.extend({
      chunk_size : 0,
      multipart : true,
      multi_selection : true,
      file_data_name : "file",
      filters : []
    }, settings);
    plupload.extend(this, {
      state : plupload.STOPPED,
      runtime : "",
      features : {},
      files : files,
      settings : settings,
      total : total,
      id : plupload.guid(),
      /**
       * @return {undefined}
       */
      init : function() {
        /**
         * @return {undefined}
         */
        function callNextInit() {
          var runtime = runtimeList[runTimeIndex++];
          var features;
          var requiredFeatures;
          var i;
          if (runtime) {
            features = runtime.getFeatures();
            requiredFeatures = self.settings.required_features;
            if (requiredFeatures) {
              requiredFeatures = requiredFeatures.split(",");
              /** @type {number} */
              i = 0;
              for (;i < requiredFeatures.length;i++) {
                if (!features[requiredFeatures[i]]) {
                  callNextInit();
                  return;
                }
              }
            }
            runtime.init(self, function(opts) {
              if (opts && opts.success) {
                self.features = features;
                self.runtime = runtime.name;
                self.trigger("Init", {
                  runtime : runtime.name
                });
                self.trigger("PostInit");
                self.refresh();
              } else {
                callNextInit();
              }
            });
          } else {
            self.trigger("Error", {
              code : plupload.INIT_ERROR,
              message : plupload.translate("Init error.")
            });
          }
        }
        var self = this;
        var i;
        var runtimeList;
        var v;
        /** @type {number} */
        var runTimeIndex = 0;
        var codeSegments;
        if (typeof settings.preinit == "function") {
          settings.preinit(self);
        } else {
          plupload.each(settings.preinit, function(method, eventName) {
            self.bind(eventName, method);
          });
        }
        settings.page_url = settings.page_url || document.location.pathname.replace(/\/[^\/]+$/g, "/");
        if (!/^(\w+:\/\/|\/)/.test(settings.url)) {
          settings.url = settings.page_url + settings.url;
        }
        settings.chunk_size = plupload.parseSize(settings.chunk_size);
        settings.max_file_size = plupload.parseSize(settings.max_file_size);
        self.bind("FilesAdded", function(up, codeSegments) {
          var i;
          var file;
          /** @type {number} */
          var G = 0;
          var re;
          var filters = settings.filters;
          if (filters && filters.length) {
            /** @type {Array} */
            re = [];
            plupload.each(filters, function(m) {
              plupload.each(m.extensions.split(/,/), function(cssText) {
                if (/^\s*\*\s*$/.test(cssText)) {
                  re.push("\\.*");
                } else {
                  re.push("\\." + cssText.replace(new RegExp("[" + "/^$.*+?|()[]{}\\".replace(/./g, "\\$&") + "]", "g"), "\\$&"));
                }
              });
            });
            /** @type {RegExp} */
            re = new RegExp(re.join("|") + "$", "i");
          }
          /** @type {number} */
          i = 0;
          for (;i < codeSegments.length;i++) {
            file = codeSegments[i];
            /** @type {number} */
            file.loaded = 0;
            /** @type {number} */
            file.percent = 0;
            /** @type {number} */
            file.status = plupload.QUEUED;
            if (re && !re.test(file.name)) {
              up.trigger("Error", {
                code : plupload.FILE_EXTENSION_ERROR,
                message : plupload.translate("File extension error."),
                file : file
              });
              continue;
            }
            if (file.size !== undef && file.size > settings.max_file_size) {
              up.trigger("Error", {
                code : plupload.FILE_SIZE_ERROR,
                message : plupload.translate("File size error."),
                file : file
              });
              continue;
            }
            files.push(file);
            G++;
          }
          if (G) {
            delay(function() {
              self.trigger("QueueChanged");
              self.refresh();
            }, 1);
          } else {
            return false;
          }
        });
        if (settings.unique_names) {
          self.bind("UploadFile", function(dataAndEvents, file) {
            var _ref = file.name.match(/\.([^.]+)$/);
            /** @type {string} */
            var ext = "tmp";
            var nome_original = file.name;
            if (_ref) {
              ext = _ref[1];
            }
            /** @type {string} */
            file.target_name = file.id + "." + ext;
            file.nome_original = nome_original;
          });
        }
        self.bind("UploadProgress", function(dataAndEvents, file) {
          /** @type {number} */
          file.percent = file.size > 0 ? Math.ceil(file.loaded / file.size * 100) : 100;
          calc();
        });
        self.bind("StateChanged", function(up) {
          if (up.state == plupload.STARTED) {
            /** @type {number} */
            p = +new Date;
          } else {
            if (up.state == plupload.STOPPED) {
              /** @type {number} */
              i = up.files.length - 1;
              for (;i >= 0;i--) {
                if (up.files[i].status == plupload.UPLOADING) {
                  /** @type {number} */
                  up.files[i].status = plupload.QUEUED;
                  calc();
                }
              }
            }
          }
        });
        self.bind("QueueChanged", calc);
        self.bind("Error", function(up, result) {
          if (result.file) {
            /** @type {number} */
            result.file.status = plupload.FAILED;
            calc();
            if (up.state == plupload.STARTED) {
              delay(function() {
                uploadNext.call(self);
              }, 1);
            }
          }
        });
        self.bind("FileUploaded", function(up, file) {
          /** @type {number} */
          file.status = plupload.DONE;
          file.loaded = file.size;
          up.trigger("UploadProgress", file);
          delay(function() {
            uploadNext.call(self);
          }, 1);
        });
        if (settings.runtimes) {
          /** @type {Array} */
          runtimeList = [];
          codeSegments = settings.runtimes.split(/\s?,\s?/);
          /** @type {number} */
          i = 0;
          for (;i < codeSegments.length;i++) {
            if (runtimes[codeSegments[i]]) {
              runtimeList.push(runtimes[codeSegments[i]]);
            }
          }
        } else {
          /** @type {Array} */
          runtimeList = runtimes;
        }
        callNextInit();
        if (typeof settings.init == "function") {
          settings.init(self);
        } else {
          plupload.each(settings.init, function(method, eventName) {
            self.bind(eventName, method);
          });
        }
      },
      /**
       * @return {undefined}
       */
      refresh : function() {
        this.trigger("Refresh");
      },
      /**
       * @return {undefined}
       */
      start : function() {
        if (this.state != plupload.STARTED) {
          /** @type {number} */
          this.state = plupload.STARTED;
          this.trigger("StateChanged");
          uploadNext.call(this);
        }
      },
      /**
       * @return {undefined}
       */
      stop : function() {
        if (this.state != plupload.STOPPED) {
          /** @type {number} */
          this.state = plupload.STOPPED;
          this.trigger("StateChanged");
        }
      },
      /**
       * @param {?} id
       * @return {?}
       */
      getFile : function(id) {
        var i;
        /** @type {number} */
        i = files.length - 1;
        for (;i >= 0;i--) {
          if (files[i].id === id) {
            return files[i];
          }
        }
      },
      /**
       * @param {Element} file
       * @return {?}
       */
      removeFile : function(file) {
        var i;
        /** @type {number} */
        i = files.length - 1;
        for (;i >= 0;i--) {
          if (files[i].id === file.id) {
            return this.splice(i, 1)[0];
          }
        }
      },
      /**
       * @param {number} start
       * @param {Object} length
       * @return {?}
       */
      splice : function(start, length) {
        var spliced;
        /** @type {Array.<?>} */
        spliced = files.splice(start === undef ? 0 : start, length === undef ? files.length : length);
        this.trigger("FilesRemoved", spliced);
        this.trigger("QueueChanged");
        return spliced;
      },
      /**
       * @param {string} name
       * @return {?}
       */
      trigger : function(name) {
        var list = events[name.toLowerCase()];
        var i;
        var args;
        if (list) {
          /** @type {Array.<?>} */
          args = Array.prototype.slice.call(arguments);
          args[0] = this;
          /** @type {number} */
          i = 0;
          for (;i < list.length;i++) {
            if (list[i].func.apply(list[i].scope, args) === false) {
              return false;
            }
          }
        }
        return true;
      },
      /**
       * @param {Object} eventName
       * @return {?}
       */
      hasEventListener : function(eventName) {
        return!!events[eventName.toLowerCase()];
      },
      /**
       * @param {string} name
       * @param {Function} func
       * @param {Object} scope
       * @return {undefined}
       */
      bind : function(name, func, scope) {
        var list;
        name = name.toLowerCase();
        list = events[name] || [];
        list.push({
          /** @type {Function} */
          func : func,
          scope : scope || this
        });
        events[name] = list;
      },
      /**
       * @param {Object} type
       * @return {undefined}
       */
      unbind : function(type) {
        type = type.toLowerCase();
        var list = events[type];
        var i;
        var func = arguments[1];
        if (list) {
          if (func !== undef) {
            /** @type {number} */
            i = list.length - 1;
            for (;i >= 0;i--) {
              if (list[i].func === func) {
                list.splice(i, 1);
                break;
              }
            }
          } else {
            /** @type {Array} */
            list = [];
          }
          if (!list.length) {
            delete events[type];
          }
        }
      },
      /**
       * @return {undefined}
       */
      unbindAll : function() {
        var selector = this;
        plupload.each(events, function(dataAndEvents, elem) {
          selector.unbind(elem);
        });
      },
      /**
       * @return {undefined}
       */
      destroy : function() {
        this.trigger("Destroy");
        this.unbindAll();
      }
    });
  };
  /**
   * @param {string} id
   * @param {string} name
   * @param {number} size
   * @return {undefined}
   */
  plupload.File = function(id, name, size) {
    var self = this;
    /** @type {string} */
    self.id = id;
    /** @type {string} */
    self.name = name;
    /** @type {number} */
    self.size = size;
    /** @type {number} */
    self.loaded = 0;
    /** @type {number} */
    self.percent = 0;
    /** @type {number} */
    self.status = 0;
  };
  /**
   * @return {undefined}
   */
  plupload.Runtime = function() {
    /**
     * @return {undefined}
     */
    this.getFeatures = function() {
    };
    /**
     * @param {?} core
     * @param {Function} allBindingsAccessor
     * @return {undefined}
     */
    this.init = function(core, allBindingsAccessor) {
    };
  };
  /**
   * @return {undefined}
   */
  plupload.QueueProgress = function() {
    var self = this;
    /** @type {number} */
    self.size = 0;
    /** @type {number} */
    self.loaded = 0;
    /** @type {number} */
    self.uploaded = 0;
    /** @type {number} */
    self.failed = 0;
    /** @type {number} */
    self.queued = 0;
    /** @type {number} */
    self.percent = 0;
    /** @type {number} */
    self.bytesPerSec = 0;
    /**
     * @return {undefined}
     */
    self.reset = function() {
      /** @type {number} */
      self.size = self.loaded = self.uploaded = self.failed = self.queued = self.percent = self.bytesPerSec = 0;
    };
  };
  plupload.runtimes = {};
  window.plupload = plupload;
})();
