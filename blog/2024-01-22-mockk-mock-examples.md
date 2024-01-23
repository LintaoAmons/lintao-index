# Mockk mock examples

You can find the runnable code at this [github repo](https://github.com/LintaoAmons/kotlin-mockk-demo/tree/main/app/src/test/kotlin/top/oatnil/kotlinmockk)
You can find the video tutorial at [bilibili](https://www.bilibili.com/video/BV17V411972b)

## Mock Static Method

```kotlin
@Nested
inner class MockStaticMethod {
    private val now = LocalDateTime.of(2023, 3, 3, 0 ,0)

    @Test
    fun `should return mocked datetime`() {
        mockkStatic(LocalDateTime::class)
        every { LocalDateTime.now() } returns now

        println(LocalDateTime.now()) // 2023-03-03T00:00

        unmockkAll()
    }
}
```

## Mock Extension Function

```kotlin
class MockExtensionFunction(private val lintao: Lintao) {
    fun bar() = lintao.extensionFunc()
}

class Lintao

fun Lintao.extensionFunc() = "ExtensionFunc"

class MockExtensionMethod {
    private val lintaoMock = mockk<Lintao>()
    private val target = MockExtensionFunction(lintaoMock)

    @Test
    fun test() {
        // highlight-next-line
        mockkStatic(Lintao::extensionFunc) {
            every { lintaoMock.extensionFunc() } returns "mocked function"

            val result = target.bar()

            assertThat(result).isEqualTo("mocked function")
        }
    }
}
```

## Mock Companion object

```kotlin
class MockCompanion {
    fun bar() = LintaoCompanion.foo()
}

class LintaoCompanion {
    companion object {
        fun foo() = "Haha"
    }
}

class MockCompanionTest {
    private val target = MockCompanion()

    @Test
    fun `should return mocked value`() {
        println(target.bar()) // Haha
        // highlight-next-line
        mockkObject(LintaoCompanion)
        // mockkObject(LintaoCompanion::class) 这种写法是错误的，不能加 `::class`
        every { LintaoCompanion.foo() } returns "mocked value"

        val bar = target.bar()

        assertThat(bar).isEqualTo("mocked value")
    }
}
```

## AndThen

```kotlin
class VerifySecondCall(private val dependency: MyDependency) {
    // highlight-next-line
    // there're two calls of function bar
    fun foo(): String {
        return dependency.bar("arg1") + dependency.bar("arg2")

    }
}

class MyDependency {
    fun bar(arg1: String) = "Before mock: Call with $arg1"
}

class TestDrive() {
    @Test
    fun `some test`() {
        val mockDependency = mockk<MyDependency>()
        every { mockDependency.bar(any()) } returns "mock1" andThen "mock2"

        val result = VerifySecondCall(mockDependency).foo()

        // highlight-next-line
        assertThat(result).isEqualTo("mock1" + "mock2")
        verify {
            mockDependency.bar(withArg { assertThat(it).isEqualTo("arg1") })
            mockDependency.bar(withArg { assertThat(it).isEqualTo("arg2") })
        }
    }
}
```


## Spyk

```kotlin
class UseSpky() {
    fun foo(): String {
        throw RuntimeException("Foo")
    }

    fun anotherFoo(): String {
        return "anotherFoo"
    }
}

class TestDrive1 {

    @Test
    fun `use spyk by normal constructor`() {
        val useSpky = spyk(UseSpky())
        every { useSpky.foo() } returns "mock"

        val fooResult = useSpky.foo()
        // highlight-next-line
        // this method returns the mocked value, didn't throw the error, which means the real implementation didn't run at all.
        assertThat(fooResult).isEqualTo("mock")

        val anotherFooResult = useSpky.anotherFoo()
        // highlight-next-line
        // this method returns the real value, 
        assertThat(anotherFooResult).isEqualTo("anotherFoo")
    }
}
```
