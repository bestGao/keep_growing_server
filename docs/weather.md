#### 城市接口
```
curl --location --request GET 'https://j.i8tq.com/weather2020/search/city.js'
```

#### 40天
```
curl --location --request GET 'http://d1.weather.com.cn/calendar_new/2020/${城市areaid}_${年月}.html?_=${时间戳}' \
--header 'Referer: http://www.weather.com.cn'
```
```
// 示例
curl --location --request GET 'http://d1.weather.com.cn/calendar_new/2020/101210101_202009.html?_=1600995444318' \
--header 'Referer: http://www.weather.com.cn'
```

#### 景区id
```
curl --location --request GET 'http://d1.weather.com.cn/index_around_2017/${城市areaid}.html?_=${时间戳}' \
--header 'Referer: http://www.weather.com.cn'
```
```
// 示例
curl --location --request GET 'http://d1.weather.com.cn/index_around_2017/101210101.html?_=1601001019166' \
--header 'Referer: http://www.weather.com.cn'
```

#### 景区
3A10121 => 3A + 城市areaid的前5位
```
curl --location --request GET 'http://d1.weather.com.cn/travel_rank/3A10121.html?_=1601001019168' \
--header 'Referer: http://www.weather.com.cn'
```
```
// 示例
curl --location --request GET 'http://d1.weather.com.cn/travel_rank/3A10121.html?_=1601001019168' \
--header 'Referer: http://www.weather.com.cn'
```

#### 一天

##### 1
```
curl --location --request GET 'http://d1.weather.com.cn/sk_2d/101210101.html?_=1600996456463' \
--header 'Referer: http://www.weather.com.cn'
```
```json
{"nameen":"hangzhou","cityname":"杭州","city":"101210101","temp":"24","tempf":"75","WD":"北风","wde":"N","WS":"4级","wse":"16-24km/h","SD":"69%","time":"09:50","weather":"多云","weathere":"Cloudy","weathercode":"d01","qy":"1009","njd":"暂缺","sd":"69%","rain":"0.0","rain24h":"0","aqi":"54","limitnumber":"5和0","aqi_pm25":"54","date":"09月25日(星期五)"}
```

##### 2
```
curl --location --request GET 'http://d1.weather.com.cn/dingzhi/101210101.html?_=1600994938234' \
--header 'Referer: http://www.weather.com.cn'
```
```js
var cityDZ101210101
={"weatherinfo":{"city":"101210101","cityname":"杭州","temp":"26℃","tempn":"19℃","weather":"多云转阴","wd":"北风转微风","ws":"3-4级转
<3级","weathercode":"d1","weathercoden":"n2","fctime":"202009251100"}};var alarmDZ101210101={"w":[]}
```

##### 3
```
curl --location --request GET 'http://d1.weather.com.cn/weather_index/101210101.html?_=1600948189900' \
--header 'Referer: http://www.weather.com.cn/'
```
```js
var cityDZ
={"weatherinfo":{"city":"101210101","cityname":"杭州","temp":"26℃","tempn":"19℃","weather":"多云转阴","wd":"北风转微风","ws":"3-4级转
<3级","weathercode":"d1","weathercoden":"n2","fctime":"202009250800"}};var alarmDZ={"w":[]};var
	dataSK={"nameen":"hangzhou","cityname":"杭州","city":"101210101","temp":"24","tempf":"75","WD":"北风","wde":"N","WS":"4级","wse":"16-24km/h","SD":"69%","time":"09:50","weather":"多云","weathere":"Cloudy","weathercode":"d01","qy":"1009","njd":"暂缺","sd":"69%","rain":"0.0","rain24h":"0","aqi":"54","limitnumber":"5和0","aqi_pm25":"54","date":"09月25日(星期五)"};var
	dataZS={"zs":{"date":"2020092508","ac_name":"空调开启指数","ac_hint":"较少开启","ac_des_s":"体感舒适，不需要开启空调。","ag_name":"过敏指数","ag_hint":"易发","ag_des_s":"应减少外出，外出需采取防护措施。","cl_name":"晨练指数","cl_hint":"较适宜","cl_des_s":"请选择避风的地点晨练，避免迎风锻炼。","co_name":"舒适度指数","co_hint":"舒适","co_des_s":"白天温度宜人，风力不大。","ct_name":"穿衣指数","ct_hint":"舒适","ct_des_s":"建议穿长袖衬衫单裤等服装。","dy_name":"钓鱼指数","dy_hint":"较适宜","dy_des_s":"风稍大会对垂钓产生一定影响。","fs_name":"防晒指数","fs_hint":"较弱","fs_des_s":"涂抹12-15SPF，PA+护肤品。","gj_name":"逛街指数","gj_hint":"较适宜","gj_des_s":"这种好天气去逛街可使身心畅快放松。","gl_name":"太阳镜指数","gl_hint":"很必要","gl_des_s":"建议佩戴透射比2级且UV400的遮阳镜","gm_name":"感冒指数","gm_hint":"少发","gm_des_s":"无明显降温，感冒机率较低。","gz_name":"干燥指数","gz_hint":"适宜","gz_des_s":"风速偏大，湿度条件较好，皮肤可做日常护理，注意预防风大带来的皮肤粗糙问题。","hc_name":"划船指数","hc_hint":"较适宜","hc_des_s":"风稍大会对划船产生一定影响。","jt_name":"交通指数","jt_hint":"良好","jt_des_s":"气象条件良好，车辆可以正常行驶。","lk_name":"路况指数","lk_hint":"干燥","lk_des_s":"天气较好，路面较干燥，路况较好。","ls_name":"晾晒指数","ls_hint":"适宜","ls_des_s":"天气不错，抓紧时机让衣物晒太阳吧。","mf_name":"美发指数","mf_hint":"适宜","mf_des_s":"风力较大容易弄脏头发，注意清洁。","nl_name":"夜生活指数","nl_hint":"较适宜","nl_des_s":"只要您稍作准备就可以放心外出。","pj_name":"啤酒指数","pj_hint":"适宜","pj_des_s":"天气炎热，可适量饮用啤酒，不要过量。","pk_name":"放风筝指数","pk_hint":"较适宜","pk_des_s":"温暖舒适，较适宜放风筝。","pl_name":"空气污染扩散条件指数","pl_hint":"良","pl_des_s":"气象条件有利于空气污染物扩散。","pp_name":"化妆指数","pp_hint":"去油","pp_des_s":"请选用露质面霜打底，水质无油粉底霜。","tr_name":"旅游指数","tr_hint":"适宜","tr_des_s":"风稍大，但仍可尽情地享受大自然风光。","uv_name":"紫外线强度指数","uv_hint":"弱","uv_des_s":"辐射较弱，涂擦SPF12-15、PA+护肤品。","wc_name":"风寒指数","wc_hint":"无","wc_des_s":"温度未达到风寒所需的低温，稍作防寒准备即可。","xc_name":"洗车指数","xc_hint":"较不宜","xc_des_s":"风力较大，洗车后会蒙上灰尘。","xq_name":"心情指数","xq_hint":"较好","xq_des_s":"温度适宜，心情会不错。","yd_name":"运动指数","yd_hint":"较适宜","yd_des_s":"风力稍强，推荐您进行室内运动。","yh_name":"约会指数","yh_hint":"较适宜","yh_des_s":"不用担心天气来调皮捣乱而影响了兴致。","ys_name":"雨伞指数","ys_hint":"不带伞","ys_des_s":"天气较好，不用带雨伞。","zs_name":"中暑指数","zs_hint":"无中暑风险","zs_des_s":"天气舒适，令人神清气爽的一天，不用担心中暑的困扰。"},"cn":"杭州"};var
	fc={"f":[{"fa":"01","fb":"02","fc":"26","fd":"19","fe":"北风","ff":"微风","fg":"3-4级","fh":"<3级","fk":"8","fl":"0","fm":"93.7","fn":"88.1","fi":"9\/25","fj":"今天"},{"fa":"02","fb":"01","fc":"25","fd":"18","fe":"东北风","ff":"微风","fg":"3-4级","fh":"
	<3级","fk":"1","fl":"0","fm":"94.7","fn":"89.9","fi":"9\/26","fj":"周六"},{"fa":"01","fb":"02","fc":"25","fd":"19","fe":"东风","ff":"微风","fg":"3-4级","fh":"
	<3级","fk":"2","fl":"0","fm":"93.8","fn":"89.8","fi":"9\/27","fj":"周日"},{"fa":"01","fb":"00","fc":"27","fd":"18","fe":"东风","ff":"微风","fg":"4-5级","fh":"
	<3级","fk":"2","fl":"0","fm":"92.9","fn":"90.4","fi":"9\/28","fj":"周一"},{"fa":"07","fb":"01","fc":"26","fd":"18","fe":"东风","ff":"微风","fg":"3-4级","fh":"
	<3级","fk":"2","fl":"0","fm":"94.2","fn":"89.1","fi":"9\/29","fj":"周二"}]}
```
