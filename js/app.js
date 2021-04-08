
const clockData = {
    getTime: () => {
        const now = new Date();

        this.seconds = now.getSeconds();
        this.minutes = now.getMinutes();
        this.hours = now.getHours();

        return [this.hours, this.minutes, this.seconds];
    }
};


const clockController = {
    init: () => {
        clockView.init();
        setInterval(() => {
            clockView.render();
        }, 1000);
    },
    getTime: () => {
        return clockData.getTime()
    }
};


const clockView = {
    init: () => {
        this.hourHand = document.querySelector('.hand-hour');
        this.minuteHand = document.querySelector('.hand-minute');
        this.secondHand = document.querySelector('.hand-second');
    },
    render: () => {
        let [hours, minutes, seconds] = clockController.getTime();

        const secondsDegree = (((seconds/60) * 360) + 90);
        const minutesDegree = (((minutes/60) * 360) + 90);
        const hoursDegree = ((((hours+minutes/60)/12) * 360) + 90);

        this.hourHand.style.transform = `rotate(${hoursDegree}deg)`;
        this.minuteHand.style.transform = `rotate(${minutesDegree}deg)`;
        this.secondHand.style.transform = `rotate(${secondsDegree}deg)`;
    }
};

clockController.init();
