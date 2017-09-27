<template>
    <div>
        <div id="header">
            <div>
                <h1>Vue.js Calendar</h1>
            </div>
            <div>
                <current-month></current-month>
            </div>
        </div>
        <div id="day-bar">
            <div v-for="dayOfWeek in daysOfWeek">{{ dayOfWeek }}</div>
        </div>
        <div id="calendar">
            <div v-for="week in weeks" class="calendar-week">
                <calendar-day v-for="day in week" :day="day"></calendar-day>
            </div>
        </div>
        <event-form></event-form>
    </div>
</template>

<script>
    import CalendarDay from './CalendarDay.vue';
    import CurrentMonth from './CurrentMonth.vue';
    import EventForm from './EventForm.vue';
    
    export default {
        data() {
            return {

            }
        },
        components: {
            CalendarDay,
            CurrentMonth,
            EventForm
        },
        computed: {
            month() {
                return this.$store.state.currentMonth;
            },
            year() {
                return this.$store.state.currentYear;
            },
            daysOfWeek() {
                return [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];  
            },
            days() {
                
                // Generating all days in current month
                let days = [];
                let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D');
                do {
                    days.push(currentDay);
                    currentDay = this.$moment(currentDay).add(1, 'days');
                } while ((currentDay.month() + 1) === this.month);
                                
                const SUNDAY = 0;
                const MONDAY = 1;
                
                // Add previous days
                currentDay = this.$moment(days[0]);
                
                if (currentDay.day() !== MONDAY) {
                    do {
                        currentDay = this.$moment(currentDay).subtract(1, 'days');
                        days.unshift(currentDay);
                        // while not monday
                    } while (currentDay.day() !== MONDAY); 
                }
                
                // Add days of the next month
                currentDay = this.$moment(days[days.length - 1]);
                
                if (currentDay.day() !== SUNDAY) {
                    do {
                        currentDay = this.$moment(currentDay).add(1, 'days');
                        days.push(currentDay);
                        // while not monday
                    } while (currentDay.day() !== SUNDAY); 
                }
                
                return days;
            },
            weeks() {
                let weeks = [];
                let week = [];
                
                for (let day of this.days) {
                    week.push(day);
                    if (week.length === 7) {
                        weeks.push(week);
                        week = [];
                    }
                }
                return weeks;
            }
        }
    }
    
</script>