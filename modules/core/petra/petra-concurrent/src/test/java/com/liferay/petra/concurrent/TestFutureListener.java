/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.liferay.petra.concurrent;

import java.util.concurrent.Future;

/**
 * @author Shuyang Zhou
 * @author Preston Crary
 */
public class TestFutureListener<T> implements FutureListener<T> {

	@Override
	public void complete(Future<T> future) {
		_count++;
		_future = future;
	}

	public int getCount() {
		return _count;
	}

	public Future<T> getFuture() {
		return _future;
	}

	private int _count;
	private Future<T> _future;

}