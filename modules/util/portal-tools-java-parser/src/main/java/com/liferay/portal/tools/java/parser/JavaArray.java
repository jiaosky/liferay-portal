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

package com.liferay.portal.tools.java.parser;

import com.liferay.portal.kernel.util.StringBundler;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Hugo Huijser
 */
public class JavaArray extends JavaExpression {

	public void addValueJavaExpression(JavaExpression valueJavaExpression) {
		_valueJavaExpressions.add(valueJavaExpression);
	}

	@Override
	public String getString(
		String indent, String prefix, String suffix, int maxLineLength,
		boolean forceLineBreak) {

		StringBundler sb = new StringBundler();

		sb.append(indent);
		sb.append(prefix);
		sb.append("{");

		if (forceLineBreak) {
			appendNewLine(
				sb, _valueJavaExpressions, indent + "\t", maxLineLength);

			sb.append("\n");
			sb.append(indent);
			sb.append("}");
			sb.append(suffix);

			return sb.toString();
		}

		append(
			sb, _valueJavaExpressions, indent, "", "}" + suffix, maxLineLength);

		return sb.toString();
	}

	private final List<JavaExpression> _valueJavaExpressions =
		new ArrayList<>();

}