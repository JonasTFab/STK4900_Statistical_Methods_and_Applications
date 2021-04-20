# 1a)
data = read.table("https://www.uio.no/studier/emner/matnat/math/STK4900/v21/obliger/crabs.txt", header=T)



# 1b)
fit.binary.width = glm(y~width, data=data, family=binomial)
summary(fit.binary.width)

beta.1.width = 0.4972               # coefficient from fitted model
se.width = 0.1017                   # standard error from fitted model
upper.width = beta.1.width + 1.96*se.width
lower.width = beta.1.width - 1.96*se.width

OR.width = exp(beta.1.width)        # Odds ratio
upper.OR.width = exp(upper.width)   # upper CI
lower.OR.width = exp(lower.width)   # lower CI

print(OR.width)
print(lower.OR.width)
print(upper.OR.width)



# 1c)
fit.binary.weight = glm(y~weight, data=data, family=binomial)
summary(fit.binary.weight)

fit.binary.color = glm(y~factor(color), data=data, family=binomial)
summary(fit.binary.color)

fit.binary.spine = glm(y~factor(spine), data=data, family=binomial)
summary(fit.binary.spine)



# 1d)
fit.binary.all = glm(y~width+weight+factor(color)+factor(spine), data=data, family=binomial)
summary(fit.binary.all)

fit.binary.ww = glm(y~width + weight, data=data, family=binomial)    # ww = width/weight
summary(fit.binary.simplified)

data.predictors = data.frame(width=data$width, weight=data$weight, color=data$color, spine=data$spine)
cor(data.predictors)



# 1e)
data.interaction = glm(y~width + spine + width*spine, data=data, family=binomial)
summary(data.interaction)



# 2a)
data = read.table("olympic.txt", header=T)




# 2b)
fit.medals.all = glm(Total2000 ~ Total1996+Log.population+offset(Log.athletes)+GDP.per.cap, data=data, family=poisson)
summary(fit.medals.all)

fit.medals.simple = glm(Total2000 ~ Total1996+offset(Log.athletes)+GDP.per.cap, data=data, family=poisson)
summary(fit.medals.simple)



# 3a)
data = read.table("https://www.uio.no/studier/emner/matnat/math/STK4900/v21/obliger/cirrhosis.txt", header=T)

library(survival)
treat = survfit(Surv(data$time, data$status)~data$treat, conf.type="none")
sex = survfit(Surv(data$time, data$status)~data$sex, conf.type="none")
ascites = survfit(Surv(data$time, data$status)~data$asc, conf.type="none")
grouped.age = survfit(Surv(data$time, data$status)~data$agegr, conf.type="none")

plot(treat, lty=1:2, xlab="Time (days)",ylab="Survival")
legend(2700, 1, c("Prednisone","Placebo"),lty=1:2)

plot(sex, lty=1:2, xlab="Time (days)",ylab="Survival")
legend(3100, 1, c("Female","Male"),lty=1:2)

plot(ascites, lty=1:3, xlab="Time (days)",ylab="Survival")
legend(3100, 1, c("None","Slight","Marked"),lty=1:3)

plot(grouped.age, lty=1:3, xlab="Time (days)",ylab="Survival")
legend(3200, 1, c("<50","50-65",">65"),lty=1:3)



# 3b)
survdiff(Surv(data$time, data$status)~data$treat)

survdiff(Surv(data$time, data$status)~data$sex)

survdiff(Surv(data$time, data$status)~data$asc)

survdiff(Surv(data$time, data$status)~data$agegr)



# 3c)
fit = coxph(Surv(time, status==1)~factor(treat)+factor(sex)+factor(asc)+age, data=data)
summary(fit)
