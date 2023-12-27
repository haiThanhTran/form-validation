//Đối tượng Validator
Validator = function (options) {
    var selectorRules = {};

    //Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errMessage
        var errMessageRender = inputElement.parentElement.querySelector(options.errSelector)
        var errMessageRenderColor = inputElement.parentElement

        //Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];
        //Lặp qua từng rules và kiểm tra
        for (var i = 0; i < rules.length; ++i) {
            var errMessage = rules[i](inputElement.value);
            if (errMessage) {
                break;
            }

        };
        if (errMessage) {
            errMessageRender.innerHTML = errMessage
            errMessageRenderColor.classList.add('invalid')

        }
        else {
            errMessageRenderColor.classList.remove('invalid')
            errMessageRender.innerHTML = ''
        }

    }

    //lấy ra cả cục chứa cả form 
    var formElement = document.querySelector(options.form);


    if (formElement) {
        formElement.onsubmit=function(e){
            e.preventDefault();
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                validate(inputElement,rule)
                
            });
        }
        //lưu lại các rules cho mỗi input
        options.rules.forEach(function (rule) {
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);

            } else {

                selectorRules[rule.selector] = [rule.test];
            }
            // console.log(selectorRules[rule.selector])
            // console.log('rule là :' + rule)



            // inputElement là các cái dòng input nhập vào



            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) { //nếu có input
                //Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);


                }
                inputElement.oninput = function () {
                    var errMessageRender = inputElement.parentElement.querySelector('.form-message')
                    var errMessageRenderColor = inputElement.parentElement

                    errMessageRenderColor.classList.remove('invalid')
                    errMessageRender.innerHTML = ''
                }
            }
        })

    }
}

//Định nghĩa các rules
//Nguyên tắc của các rules
//1.khi có lỗi thì trả ra messages lỗi
//2.khi không có lỗi thì không trả ra cái gì cả 
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {


            return value.trim() ? '' : message || 'Vui long nhap truong nay !'

        }
    }
}


Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? '' : message || 'Vui long nhap email !'


        }
    }
}


Validator.isPassword = function (selector, length, message) {
    return {
        selector: selector,
        test: function (value) {

            if (value.length >= length) {
                return '';
            } else {

                return message || 'Vui long nhap du 6 ky tu !'
            }




        }
    }
}


Validator.isConFirmed = function (selector, passwordConfirmation, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === passwordConfirmation() ? '' : message || 'Vui long nhap lai'
        }
    }
}