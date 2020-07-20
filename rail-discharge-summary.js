import app from 'zara-core-mobile/app/core/app';
import { ControllerBase } from 'zara-core-mobile/app/core/controller/base';
import dischargeSummaryTemplate from '../../view/rail/rail-discharge-summary.dust';
import dischargeSummaryListTemplate from '../../view/rail/rail-discharge-summary-list.dust';

class _controller extends ControllerBase {
    //singleton declaration
    constructor() {
        if (!_controller.instance) {
            super("discharged-cargo");
            _controller.instance = this;
        }
        return _controller.instance;
    }

    render(pageData) {
        super.render(pageData);
        _controller.instance.navigator.pushPageWithSingleTemplate(
            dischargeSummaryTemplate, app.config.getPageDetailUrl("dischargeLoadingSummary"),
            function(response) {
                console.log(response)
                _controller.instance.setPage(response.context.data);
            }, pageData, { data: pageData }
        )
    }

    setPage(data) {
        let page = _controller.instance.navigator.topPage();
        page.storage.data = data;
    }

    init(page) {
        super.init(page);
        $("#subtitle").append("<span>" + page.data.bolNbr + "</span>")
    }

    show(page) {
        super.show(page)
        page.lazyRepeat.options = {
            "searchListElement": $(page).find(".discharged-cargo-list"),
            "searchListTemplate": dischargeSummaryListTemplate,
            "dataName": 'dischargedCargo'
        }
        page.swipe.options = {
            "listItemClick": function(item, index, data) {
                $(item).find(".undo-discharged-cargo-summary").click(function() {
                    console.log(data);
                    $(this).parent().remove();
                    // dischargeLoadingSummary.render();
                });
            }
        }
    }

    destroy(page) {
        super.destroy(page);
    }

}

const instance = new _controller();
Object.freeze(instance);
export default instance;