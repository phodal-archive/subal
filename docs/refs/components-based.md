# 组件化架构

https://bulldogjob.com/articles/539-scalable-angular-application-architecture

![输入与组件输出](images/input-output.png)

## DSL 组件

[Anko](https://github.com/Kotlin/anko)

> Anko is a Kotlin library which makes Android application development faster and easier. It makes your code clean and easy to read, and lets you forget about rough edges of the Android SDK for Java.

```
verticalLayout {
    val name = editText()
    button("Say Hello") {
        onClick { toast("Hello, ${name.text}!") }
    }
}
```
