/*
 * jqLocateMe library - target users geo-location.
 *   (http://brainstorage.me/pushthebutton)
 *
 * Copyright (c) 2014 Evgeniy Zakharov
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 *  Version: 13/05/2014 rc2
 */
var locateMe = function (wrapperName, fieldName, fieldLabel, url, urlData, applyHandler, cancelHandler) {
    var _this = this,
        _urlData = urlData;

    this.isApplied = false;
    this.SearchInputLabel = jQuery("<span>").addClass("label").attr("id", fieldName + "_label").html(fieldLabel);
    this.SearchInput = jQuery("<input>").addClass("input_search").attr("id", fieldName).attr("type", "text");
    this.SearchInputTip = jQuery("<input>").addClass("input_search_tip").attr("id", fieldName + "_tip").attr("type", "text").attr("disabled", "disabled");
    this.SearchResultsTipId = jQuery("<input>").attr("id", fieldName + "_tip_id").attr("type", "hidden");
    this.SearchResults = jQuery("<div>").addClass("results").attr("id", fieldName + "_results");
    this.SearchUrl = url;

    this.Reload = function (reloadValues) {
        if (reloadValues) {
            _this.SearchInput.val("");
            _this.SearchInputTip.val("");
            _this.SearchResultsTipId.val("");
            _this.SearchResults.hide().empty();
        }

        _methods.setResultsPosition();
    };
    this.Dispose = function () {
        this.isApplied = false;
        this.SearchInputLabel.remove();
        this.SearchInput.unbind().remove();
        this.SearchInputTip.remove();
        this.SearchResultsTipId.remove();
        this.SearchResults.unbind().remove();

        _this = null;
    }
    this.Disable = function (setDisabled) {
        if (setDisabled) {
            this.SearchInput.val("").attr("disabled", "disabled");
            this.SearchInputTip.val("").attr("disabled", "disabled");
            this.SearchInputLabel.addClass("disabled");
            this.SearchResultsTipId.val("");
            this.SearchResults.empty().hide();
        }
        else {
            this.SearchInput.removeAttr("disabled");
            this.SearchInputTip.removeAttr("disabled");
            this.SearchInputLabel.removeClass("disabled");
        }

        return this;
    };
    this.AjaxRequestParameters = function (data) {        
        _urlData = data;

        return _urlData;
    };
    this.DefaultValue = function (id, val) {
        this.SearchResultsTipId.val(id);
        this.SearchInput.val(val);

        return this;
    };
    this.Value = function () {
        return { k: _this.SearchResultsTipId.val(), v: _this.SearchInput.val() };
    };

    var _methods = {
        setResultsPosition: function () {
            var inputOffset = _this.SearchInput.offset(),
                inputSize = _methods.objectWH(_this.SearchInput);

            _this.SearchResults
                .css("left", inputOffset.left)
                .css("top", inputOffset.top + inputSize.height - 4)
                .css("width", inputSize.width - 4);
        },
        retrieveResults: function (query) {

            if (query && query.length > 0) {
                var _data = {};
                if (_urlData &&
                    typeof (_urlData) === "object") {

                    _data = _urlData,
                    _data.searchquery = query;
                }
                else _data = { searchquery: query };

                jQuery.ajax({
                    async: true,
                    url: _this.SearchUrl,
                    type: "POST",
                    data: _data,
                    success: function (response) {
                        _methods.fillResults(response);
                    }
                });
            }
        },
        fillResults: function (arr) {
            _this.SearchResults.empty().hide();
            _this.SearchInputTip.val("");
            if (arr && arr.length > 1) {
                jQuery(arr).each(function (i, o) {
                    _this.SearchResults.append("<div class=\"row\" id=\"" + o.k + "\">" + o.v + "</div>");
                });
                _this.SearchResults
                    .find("div")
                    .unbind()
                    .click(function () {
                        jQuery(this).addClass("selected");
                        _methods.resultsApply();
                    }).end()
                    .css("height", arr.length * 19).show();
            }
            else if (arr && arr.length == 1) {
                var searchValueLength = _this.SearchInput.val().length,
                    arrayValue = arr[0].v,
                    arrayKey = arr[0].k;

                _this.SearchInput.val(arrayValue.substring(0, searchValueLength));
                _this.SearchResultsTipId.val(arrayKey);
                _this.SearchInputTip.val(arrayValue);
<<<<<<< HEAD
=======
            }
            else if (arr && arr.length == 0) {
                if (_this.isApplied) {
                    _this.SearchResultsTipId.val("");
                    _this.SearchInputTip.val("");

                    _this.isApplied = false;
                    if (cancelHandler && typeof (cancelHandler) === "function") {
                        cancelHandler();
                    }
                }
>>>>>>> 5d7be9f8044f7b1685c9b323677d1be2d4de6c5a
            }
            else if (arr && arr.length == 0) {
                if (_this.isApplied) {
                    _this.SearchResultsTipId.val("");
                    _this.SearchInputTip.val("");

                    _this.isApplied = false;
                    if (cancelHandler && typeof (cancelHandler) === "function") {
                        cancelHandler();
                    }
                }
            }
        },
        hideResults: function () {
            _this.SearchResults.empty().hide();
        },
        resultsMove: function (direction) {
            var currentPosition = -1,
                resultsCount = _this.SearchResults.find(".row").length - 1;

            jQuery(_this.SearchResults.children()).each(function (i, o) {
                if (jQuery(o).hasClass("selected")) {
                    currentPosition = i;
                    return;
                }
            });

            if (direction == "up") {
                if (currentPosition > 0) {
                    currentPosition--;
                    _this.SearchResults
                        .find("div.selected").removeClass("selected").end()
                        .find("div:eq(" + currentPosition + ")").addClass("selected");
                }
            }
            else {
                if (currentPosition < resultsCount) {
                    currentPosition++;
                    _this.SearchResults
                        .find("div.selected").removeClass("selected").end()
                        .find("div:eq(" + currentPosition + ")").addClass("selected");

                }
            }
        },
        resultsApply: function () {
            var selectedId = 0;
            if (_this.SearchResultsTipId.val() != "" ||
                _this.SearchResults.find("div").length > 0) {
                if (_this.SearchResults.is(":visible")) {
                    selectedId = _this.SearchResults.find(".selected").attr("id");
                    _this.SearchInput.val(_this.SearchResults.find(".selected").html());
                    _this.SearchInputTip.val("");
                    _this.SearchResultsTipId.val(selectedId);
                    _this.SearchResults.empty().hide();
                }
                else {
                    selectedId = _this.SearchResultsTipId.val();
                    _this.SearchInput.val(_this.SearchInputTip.val());
                    _this.SearchInputTip.val("");
                }

                if (!_this.isApplied) {
                    if (applyHandler &&
                        typeof (applyHandler) === "function") {
                        applyHandler(selectedId);
                    }
                    _this.isApplied = true;
                }
            }
            return selectedId;
        },
        objectWH: function (obj) {
            var r = { width: 0, height: 0 };
            r.height += obj.css("height").replace("px", "") * 1;
            //r.height += obj.css("padding-top").replace("px", "") * 1;
            //r.height += obj.css("padding-bottom").replace("px", "") * 1;
            r.height += obj.css("margin-top").replace("px", "") * 1;
            r.height += obj.css("margin-bottom").replace("px", "") * 1;
            r.height += obj.css("border-top-width").replace("px", "") * 1;
            r.height += obj.css("border-bottom-width").replace("px", "") * 1;

            r.width += obj.css("width").replace("px", "") * 1;
            //r.width += obj.css("padding-left").replace("px", "") * 1;
            //r.width += obj.css("padding-right").replace("px", "") * 1;
            r.width += obj.css("margin-left").replace("px", "") * 1;
            r.width += obj.css("margin-right").replace("px", "") * 1;
            r.width += obj.css("border-left-width").replace("px", "") * 1;
            r.width += obj.css("border-right-width").replace("px", "") * 1;

            return r;
        },
        revertWords:function(text)
        {
            var splitter = text.split(/\s+/);
            var value = "";
            for(i = 0; i<splitter.length;i++)
            {

            }
        }
    };

    var target = jQuery("." + wrapperName);
    if (target.length > 0) {

        target
            .append(this.SearchInputLabel)
            .append(this.SearchInput)
            .append(this.SearchInputTip)
            .append(this.SearchResultsTipId)
            .append(this.SearchResults);

        jQuery(window)
            .resize(function () { _methods.setResultsPosition(); })
            .trigger("resize");

        this.SearchInput
            .keydown(function (e) {
                var val = _this.SearchInput.val(),
                    valLength = val.length;

                if (e.which > 32 &&
                    e.which != 40 &&
                    e.which != 38 &&
                    e.which != 9 &&
                    e.which != 39 &&
                    e.which != 46 &&
                    e.which != 13) {

                    return true;
                }
                else if (e.which == 8 ||        // [Backspace]
                        e.which == 46) {        // [DELETE]
                    if ((valLength - 1) > 0) {
                        _methods.retrieveResults(val.substring(0, valLength - 1));
                    }
                    else _methods.hideResults();

                    if (_this.isApplied) {
                        _this.isApplied = false;
                        _this.SearchInputTip.val("");
                        _this.SearchResultsTipId.val("");

                        if (cancelHandler && typeof (cancelHandler) === "function") {
                            cancelHandler();
                        }
                    }
                }
                else if (e.which == 40) {       //▼
                    _methods.resultsMove("down");
                }
                else if (e.which == 38) {       //▲                        
                    _methods.resultsMove("up");
                }
                else if (e.which == 39) {       //→
                    _methods.resultsApply();
                }
                else if (e.which == 9 &&
                    !_this.isApplied) {       //TAB
                    _methods.resultsApply();
                    return false;
                }
                else if (e.which == 13 &&
                    !_this.isApplied) {       //ENTER
                    _methods.resultsApply();                    
                }
            })
            .keypress(function (e) {
                var text = _this.SearchInput.val(),
                    pressedChar = String.fromCharCode(e.which || e.keyCode),
                    query = text + pressedChar;
                
                //prevent [ENTER] keypress
                if (e.which != 13) {
                    _methods.retrieveResults(query);
                }
            });
    }

    return this;
};