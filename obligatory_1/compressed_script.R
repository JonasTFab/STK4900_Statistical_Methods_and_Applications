# 1a)
data = read.table("https://www.uio.no/studier/emner/matnat/math/STK4900/data/no2.txt", header=T)

plot(log.no2~log.cars, data=data, pch=19,
     xlab="log(cars per hour)", ylab="log(NO2 concentration)",
     cex.lab=1.5, cex.axis=1.5, cex=0.7)




# 1b)
plot(log.no2~log.cars, data=data, pch=19,
     xlab="log(cars per hour)", ylab="log(NO2 concentration)",
     cex.lab=1.5, cex.axis=1.5, cex=0.7)

fit = lm(log.no2~log.cars, data=data)
abline(fit)
summary(fit)




# 1c)
# Check of linearity
library(car)

crPlots(fit, terms=~log.cars, pch=19,
     xlab="log(cars per hour)", ylab="log(NO2 concentration)",
     cex.lab=1.5, cex.axis=1.5, cex=0.7)


# Check of constant variance
plot(fit$fit, fit$res, pch=19,
     xlab="Fitted values", ylab="Residuals",
     cex.lab=1.5, cex.axis=1.5, cex=0.7)

par(mfrow=c(1,2))
plot(fit,1, pch=19, cex.lab=1.5, cex.axis=1.5, cex=0.3)
plot(fit,3, pch=19, cex.lab=1.5, cex.axis=1.5, cex=0.3)


# Check of normality
hist(fit$res, pch=19, main="Histogram", breaks=20,
     cex.lab=0.1, cex.axis=2, cex.main=3)

boxplot(fit$res, pch=19, main="Boxplot",
     cex.lab=0.1, cex.axis=2, cex.main=3)

qqnorm(fit$res, pch=19, main="Q-Q plot",
     cex.lab=2, cex.axis=2, cex.main=3)
qqline(fit$res)




# 1d)
# fitting model with and without hour.of.day
fit.multiple = lm(log.no2 ~ log.cars + temp + wind.speed + hour.of.day, data=data)
summary(fit.multiple)

print("---------------------------------------------------------------------------")

fit.multiple = lm(log.no2 ~ log.cars + temp + wind.speed, data=data)
summary(fit.multiple)


# fitting model with the log of variables and also with and without hour.of.day
fit.multiple.log = lm(log.no2 ~ log.cars + temp + log(wind.speed) + log(hour.of.day), data=data)
summary(fit.multiple.log)

print("---------------------------------------------------------------------------")

fit.multiple.log = lm(log.no2 ~ log.cars + temp + log(wind.speed), data=data)
summary(fit.multiple.log)


# various plots using the log of variables without 'hour.of.day'
crPlots(fit.multiple.log, terms=~log.cars, pch=19,
     xlab="log(cars per hour)", ylab="log(NO2 concentration)",
     cex.lab=2, cex.axis=2, cex.main=3)

crPlots(fit.multiple.log, terms=~temp, pch=19,
     xlab="temperature", ylab="log(NO2 concentration)",
     cex.lab=2, cex.axis=2, cex.main=3)

crPlots(fit.multiple.log, terms=~log(wind.speed), pch=19,
     xlab="log(wind speed)", ylab="log(NO2 concentration)",
     cex.lab=2, cex.axis=2, cex.main=3)





# 2a)
data = read.table("https://www.uio.no/studier/emner/matnat/math/STK4900/data/blood.txt", header=T)

boxplot(data$Bloodpr ~ data$age, pch=19,
     xlab="Age group", ylab="Blood pressure",
     cex.lab=1.5, cex.axis=0.01)
axis(1, at=1:3, labels=c("30-45", "46-59", "60-75"), cex.axis=1.5)
axis(2, cex.axis=1.5)




# 2b)
data$age = factor(data$age)
aov.data = aov(Bloodpr~age, data=data)
summary(aov.data)




# 2c)
fit = lm(Bloodpr ~ age, data=data)
summary(fit)
