import React, { useState } from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";

export default function Support() {
    return (
        <BrowserOnly fallback={<div>Loading...</div>}>
            {() => (
                <Layout title="get-support" description="get-support">
                    <div style={{ paddingLeft: "30px", paddingTop: "50px" }}>
                        <h3> 👋 欸~ 你居然点到这个页面来了，感谢~ </h3>
                        <h3> 👻 今天想去整点薯条，要不帮我刷一下你的卡？ </h3>
                        <table>
                            <tr>
                                <th>支付宝</th>
                                <th>微信</th>
                            </tr>
                            <tr>
                                <td><img width="300px" src={require("@site/static/img/alipay.png").default} /> </td>
                                <td><img width="300px" src={require("@site/static/img/wechat-pay.png").default} /> </td>
                            </tr>
                        </table>

                        <div style={{ marginTop: "30px" }}>
                            <h3> 或者加个微信单独聊聊? 聊转行，聊代码，聊开源，聊英语学习，聊出国经历 </h3>
                            <img width="300px" src={require("@site/static/img/wechat.png").default} />
                        </div>

                    </div>
                </Layout>
            )}
        </BrowserOnly>
    );
}
