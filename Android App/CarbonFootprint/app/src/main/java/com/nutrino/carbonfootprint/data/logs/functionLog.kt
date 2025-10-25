package com.nutrino.carbonfootprint.data.logs

import android.util.Log

fun debugLogs(constant: String, e: Exception) {
    val timestamp = System.currentTimeMillis()

    // All your existing Android logs (keeping exactly the same)
    Log.d(constant, "${e.message}")
    Log.d(constant, "${e.cause}")
    Log.d(constant, "${e.localizedMessage}")
    Log.d(constant, "${e.stackTrace}")
    Log.d(constant, "${e.suppressed}")
    Log.d(constant, "${e.stackTraceToString()}")

    // Additional exception details (keeping exactly the same)
    Log.d(constant, "Exception Class: ${e.javaClass.name}")
    Log.d(constant, "Exception Simple Name: ${e.javaClass.simpleName}")
    Log.d(constant, "Exception Package: ${e.javaClass.`package`?.name}")
    Log.d(constant, "Thread Name: ${Thread.currentThread().name}")
    Log.d(constant, "Thread ID: ${Thread.currentThread().id}")
    Log.d(constant, "Timestamp: $timestamp")

    // Memory information (keeping exactly the same)
    val runtime = Runtime.getRuntime()
    Log.d(constant, "Free Memory: ${runtime.freeMemory() / 1024 / 1024} MB")
    Log.d(constant, "Total Memory: ${runtime.totalMemory() / 1024 / 1024} MB")
    Log.d(constant, "Max Memory: ${runtime.maxMemory() / 1024 / 1024} MB")
    Log.d(constant, "------- Debug Log End -------")

}