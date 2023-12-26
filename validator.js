//Đối tượng Validator
Validator = function (options) {
    

    //Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errMessage = rule.test(inputElement.value);
        var errMessageRender = inputElement.parentElement.querySelector(options.errSelector)
        var errMessageRenderColor = inputElement.parentElement

        if (errMessage) {
            errMessageRender.innerHTML = errMessage
            errMessageRenderColor.classList.add('invalid')

        }
        else {
            errMessageRenderColor.classList.remove('invalid')
            errMessageRender.innerHTML = ''
        }
        console.log(errMessageRender)
    }

    //lấy ra cả cục chứa cả form 
    var formElement = document.querySelector(options.form);


    if (formElement) {
        options.rules.forEach(function (rule) {
            console.log('rule là :' + rule)

            

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
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {


            return value.trim() ? '' : 'Vui long nhap truong nay !'

        }
    }
}


Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? '' : 'Vui long nhap email !'


        }
    }
}


Validator.isPassword = function (selector,length) {
    return {
        selector: selector,
        test: function (value) {
            
            if (value.length>=length) {
                return '';
            } else {

                return 'Vui long nhap du 6 ky tu !'
            }




        }
    }
}


Validator.isConFirmed = function (selector){

}